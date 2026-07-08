# UI Component Architecture — Klin Component Package Standard

> **Status**: Canonical Reference  
> **Package**: `@klin/ui`  
> **Last Updated**: Phase 3 Task 2

This document defines the contract that every Klin UI component must follow. The Button package (`@klin/ui/button`) is the reference implementation. Every future component (Input, Card, Badge, Modal, Tabs, Navbar, Hero, ProductCard, etc.) inherits this structure exactly.

---

## 1. Component Lifecycle

Every component transitions through these states during mount, render, and teardown:

```
Created → Loading → Validating → ResolvingTheme → Rendering → Mounted → Updating → Unmounted → Disposed
```

| State          | Description                                           |
|----------------|-------------------------------------------------------|
| Created        | Component instance constructed                        |
| Loading        | Manifest and dependencies being loaded                |
| Validating     | Props validated against schema                        |
| ResolvingTheme | Semantic tokens resolved from Theme Engine            |
| Rendering      | React tree being rendered                             |
| Mounted        | Component visible in DOM                              |
| Updating       | Re-render triggered by prop or theme changes          |
| Unmounted      | Component removed from DOM                            |
| Disposed       | All resources released                                |

---

## 2. Component Runtime State Machine

Every rendered component tracks its interactive state independently:

```
Idle → Hover → Focused → Pressed → Loading → Disabled
```

AI and the Builder can inspect these states at any time. The state machine fires observable listeners on transitions.

---

## 3. Folder Structure

Every component package follows this directory layout:

```
packages/ui/<component>/
├── manifest.json                     ← Machine-readable (Registry)
├── src/
│   ├── core/
│   │   ├── <Component>.tsx           ← React component
│   │   └── render.ts                 ← Standalone HTML render
│   ├── config/
│   │   ├── defaults.ts               ← Default prop values
│   │   ├── schema.ts                 ← Builder property schema
│   │   ├── variants.ts               ← Variant/Size/Shape constants
│   │   ├── tokens.ts                 ← Component token map
│   │   ├── metadata.ts               ← Human-readable metadata
│   │   └── builder.ts                ← Builder palette config
│   ├── runtime/
│   │   ├── hooks.ts                  ← Lifecycle hooks
│   │   ├── validation.ts             ← Runtime prop validation
│   │   ├── accessibility.ts          ← ARIA, keyboard, a11y
│   │   └── animations.ts            ← Micro-animation presets
│   ├── preview/
│   │   └── preview.ts                ← Builder palette preview
│   ├── styles/
│   │   └── styles.ts                 ← CSS-in-JS from tokens
│   └── index.ts                      ← Public API barrel
```

---

## 4. Manifest Specification

Every component ships a `manifest.json` consumed by the Registry:

| Field                   | Type       | Description                                |
|-------------------------|------------|--------------------------------------------|
| id                      | string     | Unique identifier (e.g. `klin-button`)     |
| name                    | string     | Human-readable name                        |
| category                | string     | Atomic design level (Atoms, Molecules)     |
| subcategory             | string     | Functional group (Actions, Forms)          |
| version                 | string     | SemVer version                             |
| author                  | string     | Author or team                             |
| license                 | string     | License identifier                         |
| keywords                | string[]   | Search terms                               |
| tags                    | string[]   | Categorical tags                           |
| requiredCoreVersion     | string     | Minimum @klin/core version                 |
| requiredThemeVersion    | string     | Minimum @klin/theme version                |
| supportedModes          | string[]   | Theme modes (Light, Dark, etc.)            |
| supportedPlatforms      | string[]   | Where it renders (Builder, Storefront)     |
| status                  | string     | stable / beta / alpha / experimental       |
| deprecated              | boolean    | Deprecation flag                           |

---

## 5. Schema Specification

The builder-agnostic schema describes every editable property:

```typescript
interface SchemaField {
  key: string;           // Machine key
  label: string;         // Human label
  type: SchemaFieldType; // string | number | boolean | select | color | icon | url
  defaultValue: unknown; // Default value
  required: boolean;     // Whether required
  options?: Array<{ label: string; value: string }>; // For select type
  group?: string;        // Builder panel group
  order?: number;        // Display order
  description?: string;  // Tooltip text
  validation?: object;   // Validation rules
}
```

The Puck adapter maps these fields into its configuration format.

---

## 6. Builder Metadata

Extra information the Builder needs beyond the schema:

| Field             | Description                                       |
|-------------------|---------------------------------------------------|
| group             | Palette group (e.g. "Actions")                    |
| order             | Display order in group                            |
| palette           | Label, icon, description for the palette card     |
| searchKeywords    | Search terms for palette search                   |
| defaultSize       | Default dimensions when dropped onto canvas       |
| dragPreview       | What to show during drag                          |
| dropZones         | Drop zones this component provides                |
| allowedParents    | Parent component restrictions                     |
| allowedChildren   | Child component restrictions                      |
| supportsNesting   | Whether children can be nested inside              |

---

## 7. Theme Integration

Components **never** hardcode colors. They consume semantic tokens via CSS custom properties.

### Token Hierarchy

```
button.primary.hover.background
  → maps to → brand.primary (semantic)
  → resolves to → blue500 (foundation)
  → compiles to → --klin-brand-primary: #3b82f6 (CSS variable)
```

### Token Structure

```
<component>.<variant>.<state>.<property>
```

States: `idle`, `hover`, `active`, `disabled`, `focus`  
Properties: `background`, `text`, `border`, `ring`

---

## 8. Registry Flow

```
Component Folder
    │
    ▼
manifest.json
    │
    ▼
Registry.load()
    │
    ▼
Manifest Validation
    │
    ▼
Search Index Generation
    │
    ▼
Builder Metadata Extraction
    │
    ▼
Preview Metadata Extraction
    │
    ▼
Ready
```

---

## 9. Runtime Context

Every component receives a `ComponentContext` — no globals:

| Property       | Description                                          |
|----------------|------------------------------------------------------|
| theme          | Active theme ID, mode, scope                         |
| builder        | Builder state (isEditing, isSelected, isDragging)    |
| viewport       | mobile / tablet / desktop                            |
| platform       | Builder / Preview / Storefront                       |
| projectId      | Current project                                      |
| workspaceId    | Current workspace                                    |
| locale         | i18n locale                                          |
| direction      | ltr / rtl                                            |
| eventBus       | Platform event bus reference                         |
| logger         | Structured logger                                    |
| permissions    | Permission map                                       |
| featureFlags   | Feature flag map                                     |

---

## 10. Accessibility Rules

Every component must implement:

| Requirement        | Description                                         |
|--------------------|-----------------------------------------------------|
| Keyboard nav       | Operable via keyboard alone                         |
| ARIA attributes    | Correct roles, states, properties                   |
| Screen readers     | Meaningful announcements                            |
| Focus visible      | Visible focus indicator                             |
| Reduced motion     | Respect `prefers-reduced-motion`                    |
| Color contrast     | Meet WCAG AA (4.5:1 normal, 3:1 large text)        |
| Touch target       | Minimum 44×44 CSS px                                |
| RTL support        | Correct layout in RTL languages                     |

---

## 11. Animation System

Animation presets are configurable, never hardcoded:

| Preset   | Hover Effect          | Active Effect         |
|----------|-----------------------|-----------------------|
| None     | —                     | —                     |
| Fade     | opacity 0.85          | opacity 0.7           |
| Scale    | scale(1.02)           | scale(0.97)           |
| Bounce   | translateY(-1px)      | translateY(1px)       |
| Ripple   | —                     | scale(0.97)           |
| Pulse    | pulsing animation     | —                     |

Builder exposes these as a dropdown. AI can select appropriate animations based on context.

---

## 12. Preview System

Each component provides a `PreviewConfig`:

| Field          | Description                                     |
|----------------|-------------------------------------------------|
| thumbnail      | Image path for palette card                     |
| defaultProps   | Props for default preview rendering             |
| categories     | Palette categories                              |
| keywords       | Search keywords                                 |
| previewLayout  | Layout hint (inline, block, grid)               |
| examples       | Array of variant configurations with labels     |

---

## 13. Public API Contract

Every UI package exports exactly this surface:

```
Component        → React component
render()         → Standalone HTML render
schema           → Builder property schema
defaults         → Default prop values
variants         → Variant/Size/Shape constants
tokens           → Component token map
metadata         → Human-readable metadata
preview          → Preview configuration
manifest         → Machine-readable manifest (JSON)
```

This contract is frozen. New components must conform to it exactly.

---

## 14. Testing Requirements

Every component must test:

| Area               | What to verify                                    |
|--------------------|---------------------------------------------------|
| Manifest           | Validates against ComponentManifest type           |
| Schema             | All fields present with valid types                |
| Theme resolution   | Tokens resolve to CSS variable references          |
| Runtime rendering  | Component renders correct HTML/JSX                 |
| Accessibility      | ARIA attributes, keyboard nav, focus ring          |
| Lifecycle          | State transitions fire correctly                   |
| Serialization      | Props serialize/deserialize without loss           |
| Registry           | Manifest loads and registers successfully          |

---

## 15. Marketplace Compatibility

For a component to be published to the Marketplace, it must:

1. Ship a valid `manifest.json` with all required fields
2. Pass all automated tests
3. Score above threshold on accessibility audit
4. Use only semantic tokens (no hardcoded colors)
5. Support all declared modes and platforms
6. Include preview examples
7. Include documentation

---

## Forbidden Patterns

1. **Never hardcode colors.** Use semantic tokens via CSS variables.
2. **Never read global state.** Everything comes through `ComponentContext`.
3. **Never skip validation.** Props must validate against the schema.
4. **Never bypass the Registry.** Components are discovered through manifests only.
5. **Never import from another component's internals.** Use the public API barrel only.
