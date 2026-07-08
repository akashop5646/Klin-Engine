# Renderer Engine Architecture (@klin/renderer)

The Renderer Engine is responsible for rendering Website Instances into fully interactive website payloads across multiple target environments.

## Architecture Diagram

```mermaid
graph TD
    Instance[Website Instance] --> Pipeline[Render Pipeline]
    Pipeline --> Session[Render Session]
    Session --> ResolveData[Resolve CMS Data]
    ResolveData --> ResolveVars[Resolve Variables]
    ResolveVars --> ResolveCond[Resolve Conditions]
    ResolveCond --> ResolveLayout[Resolve Layouts & Styles]
    ResolveLayout --> BuildTree[Create Render Tree]
    BuildTree --> Target{Render Mode Target}
    Target -->|SSR| Server[Server Runtime]
    Target -->|CSR| Client[Client Runtime]
    Target -->|Edge| Edge[Edge Runtime]
    Server --> Hydrate[progressive Hydration Strategy]
    Client --> Hydrate
    Edge --> Hydrate
```

## Key Modules

### 1. Render Session & Context
- **RenderContext:** Isolated request-scoped settings (e.g. active locale, cookies, headers, device viewport).
- **RenderSession:** Unique ID tracking trace paths, diagnostics metrics, and pipeline warnings.

### 2. Rendering Pipeline
- **RenderPipeline:** Manages sequential stages resolving variables (`VariableResolver`), dynamic CMS bindings (`BindingResolver`), layout rules (`LayoutEngine`), styling classes (`StyleResolver`), and assets preloading (`PreloadManager`).

### 3. Progressive Hydration & Islands
- **Islands Engine:** Renders static HTML shells with embedded interactive islands (`IslandRenderer`).
- **Hydration Strategy:** Declares progressive hydration strategies (`Immediate`, `Lazy`, `Visible`, `Interaction`).

### 4. Dependency Tracing Graph
- **RenderGraph:** Tracks block dependencies on CMS fields, variable keys, and tokens to enable fast sub-tree partial updates.
- **AssetGraph:** Maps block layout resources (images, fonts, scripts) to allow asset pruning prior to page deployment.

### 5. AI Traceability & Diagnostics
- **RenderMetadata & AIRenderHints:** Retains conversion logs, confidence indexes, and JSX source properties for round-trip migrations.
- **DiagnosticsManager:** Exposes centralized metrics profiling.
- **DevelopmentOverlay:** Renders layout inspector boundaries and FPS statistics overlay in dev mode.
