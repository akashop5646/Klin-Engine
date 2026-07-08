# Theme Engine Architecture — Klin Design Token System

> **Status**: Canonical Reference  
> **Package**: `@klin/theme`  
> **Last Updated**: Phase 3 Task 1

This document is the definitive architectural reference for the Klin Theme Engine. Every component, block, template, renderer, and AI-generated design consumes design tokens through this system. Changes to this document require explicit architectural review.

---

## 1. Theme Lifecycle

Every theme instance transitions through defined states. No operation can skip a state.

```
Created ──> Initializing ──> Loading ──> Resolving ──> Compiling ──> Ready ──> Switching ──> Disposed
```

| State         | Description                                                    |
|---------------|----------------------------------------------------------------|
| Created       | ThemeEngine constructed, no data loaded                        |
| Initializing  | Internal subsystems starting (hooks, cache, adapters)          |
| Loading       | Raw theme JSON/manifest being loaded from Registry             |
| Resolving     | Semantic aliases being resolved to foundation values           |
| Compiling     | Resolved tokens being compiled into CSS custom properties      |
| Ready         | Theme is active and injectable                                 |
| Switching     | Transitioning from one theme to another at runtime             |
| Disposed      | All resources released, caches cleared                         |

---

## 2. Theme Compilation Pipeline

The full pipeline from discovery to injection:

```
Registry                    ← Discovery source (only)
    │
    ▼
Load Theme Manifest         ← Raw JSON/TS loaded
    │
    ▼
Validate Manifest           ← ThemeValidator checks structure
    │
    ▼
Resolve Foundation Tokens   ← Primitives extracted
    │
    ▼
Resolve Semantic Tokens     ← Roles mapped to foundation values
    │
    ▼
Resolve Aliases             ← Multi-level alias chains flattened
    │
    ▼
Diff Previous Theme         ← ThemeDiff identifies changed tokens
    │
    ▼
Compile CSS Variables       ← ThemeCompiler generates --klin-* declarations
    │
    ▼
Cache Compiled Output       ← ThemeCache stores at each layer
    │
    ▼
Inject into Runtime Scope   ← ThemeRuntimeInstance writes to DOM scope
    │
    ▼
Fire Events                 ← EventBus publishes theme.compiled, theme.applied
    │
    ▼
Ready
```

---

## 3. Token Hierarchy

Tokens are layered into four levels. Each level references the level above it — never the reverse.

```
┌─────────────────────────────────────────────┐
│  Foundation Tokens (Primitives)             │
│  blue500, gray900, spacing-16, radius-8     │
├─────────────────────────────────────────────┤
│  Semantic Tokens (Roles)                    │
│  brand.primary, surface.background,         │
│  text.primary, border.default               │
├─────────────────────────────────────────────┤
│  Component Tokens (Scoped)                  │
│  button.primary.background → brand.primary  │
│  input.border → border.default              │
├─────────────────────────────────────────────┤
│  Overrides (Merchant / Custom)              │
│  Merchant-specific tweaks applied last      │
└─────────────────────────────────────────────┘
```

**Rule**: Components and AI never reference foundation tokens directly. They consume semantic or component tokens. The compiler resolves them to concrete values internally.

---

## 4. Semantic Token Flow

A semantic token resolves through three stages:

```
Component requests "button.primary.background"
    │
    ▼
Component Token Layer maps to "brand.primary"
    │
    ▼
Semantic Token Layer maps to "blue500"
    │
    ▼
Foundation Token Layer resolves to "#3b82f6"
    │
    ▼
CSS Variable output: --klin-brand-primary: #3b82f6;
```

This indirection makes themes portable. A luxury theme maps `brand.primary` to `gold` instead of `blue500`. Components do not change.

---

## 5. Theme Inheritance

Themes support unlimited inheritance depth:

```
Base Theme
    │
    ▼
Commerce Theme (extends Base, overrides spacing)
    │
    ▼
Luxury Theme (extends Commerce, overrides colors)
    │
    ▼
Merchant Overrides (runtime customizations)
```

Only overridden tokens are stored at each level. The resolver merges upward from the base.

---

## 6. Cache Layers

Four distinct cache layers prevent unnecessary recompilation:

| Layer               | Key              | Contents                           |
|---------------------|------------------|------------------------------------|
| Raw Theme Cache     | `themeId`        | Original theme JSON/config         |
| Resolved Cache      | `themeId`        | Fully resolved semantic values     |
| Compiled CSS Cache  | `themeId`        | Generated CSS variable strings     |
| Runtime Style Cache | `scope:themeId`  | Injected stylesheet references     |

When a theme switches, `ThemeDiff` identifies changed tokens. Only modified tokens trigger recompilation, preserving cached outputs for unchanged sections.

---

## 7. Runtime Scopes

Multiple theme instances can run simultaneously via `ThemeRuntimeManager`:

| Scope              | Usage                                    |
|--------------------|------------------------------------------|
| `:root`            | Storefront (customer-facing)             |
| `#builder`         | Builder canvas (editor interface)        |
| `#preview`         | Live preview window                      |
| `[data-theme]`     | Section-level theme overrides            |
| `.shadow-root`     | Shadow DOM isolated components           |

Each scope gets its own `ThemeRuntimeInstance` with an independent `ThemeContext`.

### Variable Prefix Strategy

Scoped prefixes prevent variable collisions:

| Prefix              | Usage                     |
|----------------------|---------------------------|
| `--klin-*`           | Platform default tokens   |
| `--merchant-*`       | Merchant override tokens  |
| `--builder-*`        | Editor interface overlays |
| `--preview-*`        | Preview-specific tokens   |

---

## 8. Public APIs

### ThemeEngine (Orchestrator)
```
initialize()      → Boot subsystems
load(theme)        → Load and validate a raw theme
compile(theme)     → Compile tokens into CSS variables
apply(theme, ctx)  → Inject compiled CSS into a runtime scope
switch(theme, ctx) → Switch themes at runtime without reload
serialize(theme)   → Export theme as JSON
deserialize(json)  → Import theme from JSON
reset()            → Clear all caches and active themes
```

### ThemeCompiler
```
compile(theme, prefix?)  → Generate CSS variable declarations
```

### TokenResolver
```
resolve(theme)  → Resolve semantic aliases to foundation values
```

### ThemeSerializer
```
serialize(theme)    → Theme → JSON string
deserialize(json)   → JSON string → Theme object
```

### ThemeDiff
```
compare(oldTheme, newTheme)  → List of changed token paths
```

---

## 9. Event Flow

All theme operations publish events through `@klin/event-bus`:

| Event              | Trigger                                  |
|--------------------|------------------------------------------|
| `theme.loading`    | Theme load begins                        |
| `theme.loaded`     | Theme loaded and validated               |
| `theme.validated`  | Validation passed                        |
| `theme.compiled`   | CSS variables generated                  |
| `theme.cached`     | Compiled output cached                   |
| `theme.applied`    | CSS injected into runtime scope          |
| `theme.switched`   | Active theme changed                     |
| `theme.exported`   | Theme serialized for export              |
| `theme.imported`   | Theme deserialized from import           |
| `theme.failed`     | Any theme operation failed               |

---

## 10. Registry Integration

Themes are **never** discovered by the runtime directly. The Registry is the single discovery source:

```
Registry
    │
    ▼
Theme Manifest (metadata, compatibility, preview)
    │
    ▼
ThemeEngine.load()
    │
    ▼
Compile → Cache → Inject
```

Every theme ships with a manifest containing: `id`, `name`, `version`, `author`, `description`, `category`, `previewImage`, `supportsDarkMode`, `supportsEditor`, `requiredCoreVersion`, `license`, `tags`.

---

## 11. Adapter System

Adapters decouple the compiler output from the injection target:

| Adapter                  | Output                              |
|--------------------------|-------------------------------------|
| CSS Variables Adapter    | Standard `:root { --var: val }` CSS |
| Tailwind Adapter         | Tailwind config token mapping       |
| React CSS-in-JS Adapter  | Dynamic style object injection      |
| Shadow DOM Adapter       | Shadow root scoped injection        |

To add a new adapter, implement the `ThemeAdapter` interface:

```typescript
interface ThemeAdapter {
  generate(compiledCSS: string, scope: string): string;
}
```

---

## 12. Hook System

Hooks allow plugins, AI, and marketplace themes to intercept the theme pipeline:

| Hook              | Timing                                          |
|-------------------|-------------------------------------------------|
| BeforeCompile     | Before tokens are compiled into CSS             |
| AfterCompile      | After CSS generated, before caching             |
| BeforeApply       | Before CSS injected into DOM scope              |
| AfterApply        | After injection, before events fire             |
| BeforeSwitch      | Before theme switch begins                      |
| AfterSwitch       | After new theme is active                       |
| BeforeSerialize   | Before theme exported to JSON                   |
| AfterSerialize    | After JSON generated                            |

Example use case: A plugin modifies fonts in `BeforeApply` based on merchant branding preferences.

---

## 13. Performance Targets

| Metric                        | Target             |
|-------------------------------|--------------------|
| Theme load + validate         | < 10ms             |
| Full compilation (cold)       | < 50ms             |
| Diff-based recompilation      | < 10ms             |
| Runtime switch (hot)          | < 20ms             |
| Cache hit resolution          | < 1ms              |
| CSS variable count per theme  | < 800 variables    |
| Memory per cached theme       | < 200KB            |

The `ThemeMetricsCollector` tracks compilation counts, switch counts, cache hit ratios, and timing data for continuous performance monitoring.

---

## Forbidden Patterns

1. **Never hardcode colors in components.** Always consume semantic tokens.
2. **Never bypass the Registry.** Theme discovery goes through Registry only.
3. **Never reference foundation tokens from component code.** Use semantic or component token layers.
4. **Never inject CSS outside of ThemeRuntimeInstance.** All DOM writes go through the adapter.
5. **Never skip validation.** Every theme passes through `ThemeValidator` before compilation.
