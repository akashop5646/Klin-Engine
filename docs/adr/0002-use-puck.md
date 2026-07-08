# ADR 0002: Use Puck Editor as Layout Editing Adapter

## Context
Klin requires a visual drag-and-drop page customization layout workspace.

## Decision
We choose **Puck Editor** as our primary editor adapter.

## Rationale
- Puck provides clean layout canvas adapters.
- Keeps registry definitions decoupled, allowing components to dynamically map fields into Puck schemas without hardcoding editor details.
