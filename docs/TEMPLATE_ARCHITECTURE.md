# Klin Template Architecture

This document defines the composition rules, lifecycles, inheritance mechanics, and serialization standards of the Klin Template System (`@klin/templates`).

---

## 1. Architectural Role

Templates compose reusable layout structures (e.g. SaaS Homepage, Agency Landing, Ecommerce Storefront) from registered blocks. They manage the document-level hierarchy of sections while remaining fully configurable inside the visual customizer.

```mermaid
graph TD
    Template[Template Definition]
    Template --> Composition[LayoutTree / SectionManager]
    Composition --> Blocks[BlockResolver]
    Blocks --> Registry[@klin/registry]
    Registry --> BlockA[Hero Block]
    Registry --> BlockB[Feature List Block]
    Registry --> BlockC[Footer Block]
```

---

## 2. Template Lifecycle

1. **Created**: TemplateInstance structure is allocated.
2. **Loading**: Reads the TemplateManifest file and validates parameters.
3. **Resolving Blocks**: Resolves each block dependency from `@klin/registry`.
4. **Resolving Theme**: Theme context maps style variations to the layout.
5. **Validating**: Validates layout schema and required sections check.
6. **Rendering**: React tree creation phase.
7. **Mounted**: Customizer loads the rendered layout on canvas.
8. **Updating / Disposed**: Lifecycle cleanups and event triggers.

---

## 3. Template Inheritance

Templates support inheritance hierarchies to enable layout sharing and override policies:

```
[Base Template] (Standard Layout)
     │
     └── [Brand Theme Override] (Customizes blocks and properties)
           │
           └── [Campaign Instance] (Sets target landing page props)
```

- **Extend**: Derive new templates from a parent definition.
- **Overrides**: Replace properties on specific section blocks.
- **Merge**: Traverse and combine the section tree hierarchies dynamically.

---

## 4. Template Variants

Each template definition can supply stylistic variations (e.g., Modern Dark, Elegant Light, Minimalist) using `TemplateVariantEngine`. Property values are merged into the schema depending on the selected active variant.

---

## 5. Serialization and Migration

- **Serialization**: `TemplateSerializer` turns active instances into a standardized JSON format.
- **Deserializer**: `TemplateDeserializer` reconstructs layout objects.
- **Migration**: `MigrationEngine` processes updates to safely bring older template schemas up to the latest specification version.
