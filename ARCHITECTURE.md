# Klin Platform Architecture & Dependency Guidelines

This document details the architectural specifications, engine interactions, and dependency rules governing the **Klin Framework**.

---

## 1. Engine Diagram

```mermaid
graph TD
    subgraph UI/Client Layer
        A[React App / CLI] --> B[KlinSDK]
    end

    subgraph SDK Orchestrator
        B --> C[Platform SDK]
        B --> D[Builder SDK]
        B --> E[Renderer SDK]
        B --> F[CMS / Commerce / Theme SDKs]
    end

    subgraph Runtime Core
        C & D & E & F --> G[KlinRuntime]
        G --> H[EngineRegistry]
        G --> I[PluginRegistry]
        G --> J[RuntimeContainer]
    end

    subgraph Engines Subsystem
        H --> K[PlatformEngine]
        H --> L[BuilderEngine]
        H --> M[RendererEngine]
        H --> N[CommerceEngine]
        H --> O[ThemeEngine]
    end

    subgraph Storage Layer
        K & L & M & N & O --> P[(MongoDB / Local Cache)]
    end
```

---

## 2. Dependency Graph

Framework packages must adhere strictly to a top-down dependency design. Reverse imports from `apps/` or other restricted packages are forbidden.

```mermaid
graph TD
    core[@klin/core] --> data[@klin/data]
    data --> theme[@klin/theme]
    theme --> blocks[@klin/blocks]
    blocks --> builder[@klin/builder]
    builder --> renderer[@klin/renderer]
    renderer --> platform[@klin/platform]
    platform --> commerce[@klin/commerce]
    commerce --> devtools[@klin/devtools]
    
    subgraph Framework Boundary
        core
        data
        theme
        blocks
        builder
        renderer
        platform
        commerce
        devtools
    end
    
    apps[apps/web, apps/studio] --> sdk[@klin/sdk]
    sdk --> core
```

---

## 3. Runtime Flow

```mermaid
sequenceDiagram
    participant App as Client Application
    participant R as KlinRuntime
    participant ER as EngineRegistry
    participant PE as PlatformEngine
    participant RE as RendererEngine

    App->>R: KlinRuntime.getInstance()
    App->>R: registerPlatformEngine(new PlatformEngine())
    App->>R: registerRendererEngine(new RendererEngine())
    App->>R: boot()
    activate R
    R->>ER: Initialize PlatformEngine
    R->>ER: Initialize RendererEngine
    R: State transition -> READY
    R-->>App: Boot Completed
    deactivate R
```

---

## 4. Builder Flow

```mermaid
sequenceDiagram
    participant UI as Studio Customizer
    participant SDK as KlinSDK
    participant BE as BuilderEngine
    participant DB as MongoDB

    UI->>SDK: klin.builder.load(websiteId)
    SDK->>DB: Fetch layout document
    DB-->>SDK: Return JSON document
    SDK->>BE: loadDesignState(JSON)
    BE->>BE: Generate layout tree node references
    BE-->>UI: Return layout tree structure
    
    Note over UI,BE: User inserts element / edits properties
    UI->>BE: addNode(nodeId, blockType)
    BE->>BE: Update node children lists
    BE->>BE: pushHistoryState()
    BE-->>UI: Refresh layout tree preview
```

---

## 5. Renderer Flow

```mermaid
sequenceDiagram
    participant C as Client Request
    participant R as RendererEngine
    participant T as ThemeEngine
    participant D as DataEngine

    C->>R: renderPage(pageId)
    activate R
    R->>T: Resolve theme styles & font tokens
    T-->>R: Return Compiled CSS
    R->>D: Resolve CMS bindings & product values
    D-->>R: Return bound dynamic data
    R->>R: Hydrate block trees & compile virtual elements
    R-->>C: Return HTML Document & Hydration Scripts
    deactivate R
```

---

## 6. Publishing Flow

```mermaid
sequenceDiagram
    participant U as User Click
    participant SDK as KlinSDK
    participant PE as PlatformEngine
    participant R as RendererEngine
    participant CDN as Deployed Edge

    U->>SDK: klin.platform.publish(websiteId)
    SDK->>PE: publishWebsiteDesign(websiteId)
    activate PE
    PE->>PE: Freeze draft layout to snapshot
    PE->>R: Compile production static assets
    R-->>PE: Return bundled HTML/CSS/JS files
    PE->>CDN: Push assets to distribution endpoint
    PE-->>SDK: Return live subdomain URL
    deactivate PE
    SDK-->>U: Show success dialog & subdomain link
```

---

## 7. Workspace Flow

```mermaid
sequenceDiagram
    participant CLI as Klin CLI
    participant SDK as KlinSDK
    participant PE as PlatformEngine
    participant S as Starters

    CLI->>SDK: klin create my-shop --template ecommerce
    SDK->>PE: cloneTemplate(ecommerce)
    PE->>S: Copy template assets & dependency profiles
    PE-->>SDK: Cloned successfully (returns site ID)
    SDK-->>CLI: Scaffolded my-shop target workspace
```

---

## 8. Dependency Rules

1. **Framework Isolation:** Sibling engine dependencies under `packages/` must go strictly downwards. Sibling packages may only query other sibling APIs via `KlinRuntime.getInstance().engines` or public export entries.
2. **Reverse imports are strictly forbidden:** Sibling engines or framework layers must never import code from `apps/` (such as `apps/web/` or custom dashboard pages).
3. **No direct instantiation:** Sibling packages must not directly call `new OtherEngine()`. They must resolve engines via the runtime service locator.
