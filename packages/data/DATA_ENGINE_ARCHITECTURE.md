# Klin Data Engine Architecture

This document describes the design system and file structure of the Klin Data Engine (`@klin/data`).

## Hierarchy
The core hierarchy of dynamic data modeling inside Klin consists of:
```
Collection (Schema/Indexes)
   ↓
Entry (Universal records, localization)
   ↓
Field (Property values, data validations, math formulas)
```

## Website Instances vs Templates
Klin implements a strict visual blueprint layout separation:
1. **Templates** are read-only immutable visual frameworks containing layout coordinates, static structures, default configurations, and starter data profiles.
2. **Website Instances** are separate provisions with their own settings, pages, database spaces, and localized assets. Modifying settings or inventory on a website instance leaves the base template untouched.

## Dynamic Bindings
Any supported builder node properties can bind dynamically using expression markers:
- `{{product.title}}` → resolves the value in the active product scope.
- `{{settings.company.logo}}` → resolves properties from global settings.

## Execution Flows
- **Mutations:** Flows through Data Middleware (Auto Slug, HTML Sanitizers) and triggers Lifecycle Hooks (`beforeUpdate`, `afterUpdate`).
- **Real-Time Canvas Updates:** When items save, the `LiveBindingManager` triggers updates directly for matching layout blocks in the visual builder without full page re-renders.
- **Audit Logs:** Modifying collections/entries appends sequential logs in `EventStore`.
