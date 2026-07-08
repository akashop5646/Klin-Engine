# Visual Builder Engine Architecture

This document describes the design specifications of the visual customizer workspace package (`@klin/builder`).

## 1. Design Overview
The builder implements a model-view-controller visual editor. It integrates with Puck as the visual drag-and-drop workspace container, while defining global state, data bindings, routing, SEO checklist audits, and layouts persistence layer.

```
                  +----------------------------------+
                  |         BuilderManager           |
                  +-----------------+----------------+
                                    |
                  +-----------------v----------------+
                  |         BuilderContext           |
                  +-----------------+----------------+
                                    |
       +----------------------------+----------------------------+
       |                            |                            |
+------v------+              +------v------+              +------v------+
|   Canvas    |              |  Inspector  |              |   Explorer  |
+-------------+              +-------------+              +-------------+
```

## 2. Core Modules
- **Core Orchestrator (`src/core/`):** Manages preferences configurations, responsive devices breakpoints (`BreakpointManager.ts`), and context maps (`BuilderContext.ts`).
- **Canvas Systems (`src/canvas/`):** Includes Figma-like constraints calculations (`Constraints.ts` and `ConstraintResolver.ts`) and Auto-layout grid distributions (`AutoLayout.ts`).
- **Reusable Structures (`src/components/` & `src/global/`):** Governs layout section Blueprints, Reusable components, and Global elements synced across page layouts.
- **Inspector Panels (`src/inspector/` & `src/variables/`):** Hosts properties inputs (typographies, spacing, borders) and bindings variables resolvers.
- **Diagnostics Inspectors (`src/diagnostics/`):** Audits page templates for SEO missing keys, page load scores, and accessibility issues.
- **Plugin Sandboxing (`src/plugins/`):** Implements dynamic third-party integration evaluation scripts wrapper runs.
