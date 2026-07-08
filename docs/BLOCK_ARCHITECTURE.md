# Klin Block Architecture

This document defines the composition rules, lifecycles, and registry standards of the Klin Block System (`@klin/blocks`).

---

## 1. Composition Model

Blocks are website sections composed of primary UI components (Buttons, Paragraphs, Container boxes, images). 
They resolve their sub-components dynamically from the `@klin/registry` using `ComponentResolver` rather than importing absolute file locations.

```mermaid
graph TD
    Block[Hero Block]
    Block --> Resolver[ComponentResolver]
    Resolver --> Registry[@klin/registry]
    Registry --> Container[UI Container]
    Registry --> Heading[UI Heading]
    Registry --> Button[UI Button]
```

---

## 2. Block Lifecycle Stages

1. **Created**: Instance is allocated inside `BlockFactory`.
2. **Loading**: Initial manifest loading and property validation.
3. **Resolving Components**: `ComponentResolver` verifies all required components exist in the registry catalog.
4. **Resolving Theme**: Context theme bindings apply semantic CSS tokens to the render boundaries.
5. **Validating**: Schema parameters validation checks.
6. **Rendering**: `BlockRenderer` processes config variables to React element trees.
7. **Mounted**: Block mounts onto the editor canvas.
8. **Updating / Unmounted / Disposed**: Lifecycle cleanups.

---

## 3. Package Folder Standard

Every future block (Hero, Footer, Navbar) must follow this package directory layout:

```
packages/blocks/<block-name>/
├── manifest.json
└── src/
    ├── <BlockName>.tsx
    ├── config/
    │   ├── schema.ts      # Editable properties
    │   ├── defaults.ts    # Initial properties
    │   ├── metadata.ts    # Details, keywords, categories
    │   ├── variants.ts    # Stylistic variations
    │   ├── builder.ts     # Editable region selectors
    │   └── tokens.ts      # Semantic theme variables mapping
    ├── composition/
    │   ├── layout.ts      # Nested hierarchy
    │   └── slots.ts       # Placeholders
    ├── runtime/
    │   ├── validation.ts  # Component registry dependencies check
    │   ├── hooks.ts       # Load/Render hooks
    │   ├── accessibility.ts # Roles & standards
    │   └── animations.ts  # Animations mapping
    ├── preview/
    │   └── preview.ts     # Keywords matching
    ├── serialization/
    │   ├── serializer.ts
    │   └── deserializer.ts
    └── index.ts
```
