# Data Flow Architecture

This document describes the lifecycle of design configurations, component discovery, visual customizations, and final production rendering in the Klin platform.

```mermaid
sequenceDiagram
  participant Dev as Developer Component
  participant Reg as Registry Catalog
  participant Discovery as Component Discovery
  participant Map as Builder Schema Mapper
  participant Canvas as Editor Canvas
  participant Cmd as Command Engine
  participant EB as Event Bus
  participant Ser as Serializer Pipeline
  participant DB as Storefront DB

  Dev->>Reg: Register manifest + schema
  Reg->>Discovery: Discover registered nodes
  Discovery->>Map: Map ComponentSchema to BuilderSchema
  Map->>Canvas: Build Puck Component Configurations
  Canvas->>Cmd: User edits -> trigger Command
  Cmd->>EB: Publish events to Event Bus
  EB->>Ser: Auto-save -> serialize state
  Ser->>DB: Persist Page JSON with version tags
```

## Lifecycle Stages

### 1. Ingestion & Discovery
* Components declare their properties using the builder-agnostic `ComponentSchema` contract.
* The `Registry` catalogues manifest declarations.
* `Discovery` scans catalogs at load time to gather active layouts.

### 2. Schema Transformation
* `BuilderSchemaMapper` normalizes schemas into intermediate `BuilderSchema` descriptors.
* `PuckFieldMapper` translates descriptors into puck editor fields.

### 3. Editor Interaction
* Actions on the canvas (additions, deletions, shifts) dispatch commands through the `CommandBridge` to the `CommandEngine`.
* Executions are validated, updated in memory, recorded in undo/redo history stacks, and published to the `EventBus`.

### 4. Serialization
* The editor state triggers `Serializer` pipeline steps (Normalize → Validate → JSON Conversion → Optimize → Versioning).
* Persists the resulting Page JSON complete with `schemaVersion`, `builderVersion`, and `pageVersion` headers.
