# Klin Core Architecture

This document defines the immutable architectural principles, layers, dependency rules, package responsibilities, and execution pipelines of the Klin platform. It serves as the canonical reference ("constitution") for preventing architectural drift.

---

## 1. Platform Vision

Klin is designed as an extensible, modular website builder platform rather than a single application.
- **Package-Driven**: To allow independent scaling of builder core, rendering engine, commerce features, and AI plugins.
- **Event-Driven**: Decoupling visual customizer components through namespaced events.
- **Command-Driven**: Ensuring every edit (add section, update props, change themes) is an immutable command supporting undo/redo history and transactions rollback.
- **Modular**: Eliminating direct dependencies on specific visual frameworks (like Puck or React) at the engine level.

---

## 2. Platform Layers

```
Applications (Design Studio, Dashboard, Storefront)
    │
Engine Packages (Theme, Runtime, Compiler, Renderer, Templates)
    │
Execution Packages (Event Bus, Command Engine, Registry)
    │
Foundation Packages (Core, Config, Shared, Schemas)
```

- **Foundation Packages**: Define primitive types, global constants, validation schemas, and configuration variables.
- **Execution Packages**: Orchestrate lifecycle operations, deliver event messages, index resources, and execute editor modifications.
- **Engine Packages**: Manage layouts rendering, compiler templates bundling, and styles tokenization.
- **Applications**: Customizer canvas and manager interfaces.

---

## 3. Dependency Rules

Dependencies must flow strictly downward:
`Applications` → `Engine Packages` → `Execution Packages` → `Foundation Packages`.

### Forbidden Dependencies
- No engine package can import application code (e.g., `Renderer` cannot import `Builder`).
- No foundation package can depend on execution or engine packages (e.g., `@klin/core` cannot import `@klin/event-bus`).
- No UI components can import composition blocks directly.

---

## 4. Package Responsibilities Matrix

| Package | Responsibility | Allowed Imports | Forbidden Imports |
| :--- | :--- | :--- | :--- |
| **@klin/core** | Primitives, Ids, Results, Logging | None | Everything else |
| **@klin/config** | Env vars validation | Core | Shared, Schemas |
| **@klin/shared** | Type contracts, list helpers | Core | Event Bus, Registry |
| **@klin/schemas**| Zod validation rules | Shared, Core | Event Bus, Registry |
| **@klin/event-bus**| Channel-based messaging | Shared, Schemas | Command Engine, Registry |
| **@klin/command-engine**| Command mutations, history | Event Bus | Theme, Registry |
| **@klin/registry**| Dynamic plugin/assets registry| Command Engine | UI, Blocks |

---

## 5. Event Flow Pipeline

```
User Action ──> Command ──> Validation ──> Execute ──> Publish Event ──> Channel ──> Subscribers ──> History ──> Replay
```

Every user action triggers a namespaced event matching dot-notation namespaces (e.g., `builder.section.added`) routed into dedicated channels to avoid dispatch congestion.

---

## 6. Command Execution Flow

```
Create Command ──> Validate ──> Authorization ──> Queue ──> Execute ──> Event Bus ──> History ──> Metrics ──> Return
```

- **Transactions**: Multi-actions are committed sequentially. If one fails, `undo()` is executed in reverse order on already committed commands to roll back the state layout tree.
- **Immutability**: Event payloads are cloned and deeply frozen before delivery to subscriptions.

---

## 7. Registry Flow

Nothing scans the filesystem directly. Subsystems query the registry:

```
Builder ──> Registry ──> Component ──> Manifest ──> Schema ──> Renderer ──> React ──> HTML
```

---

## 8. Golden Rules
1. **Everything is a Package**: Keep abstraction boundaries decoupled.
2. **Immutable States**: No direct mutations allowed outside Command Engine executions.
3. **Monadic Results**: Every core execution returns a standard `Result<T, E>` from `@klin/core`.
4. **Stable Public APIs**: Contributors only depend on top-level exports of each package's main index file.
