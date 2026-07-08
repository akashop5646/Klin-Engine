# ADR 0004: Component Package Self-Contained System

## Context
Klin needs to scale up to support custom developer packages and a widget marketplace.

## Decision
We enforce a **Self-Contained Package System** for all components. Each element is isolated in its folder with its own `package.json`, `manifest.json`, tests, and configurations.

## Rationale
- Decouples component logic.
- Enables individual package publication.
- Automates scanning, registry, and dependency routing pipelines.
