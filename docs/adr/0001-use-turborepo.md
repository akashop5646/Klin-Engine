# ADR 0001: Use Turborepo for Workspace Caching & Pipeline Coordination

## Context
Klin is designed as an enterprise visual builder monorepo with multiple apps (storefront, visual editor canvas, admin dashboard) and dozens of packages. We need a performant monorepo tool to run builds, lints, and type checks efficiently.

## Decision
We choose to use **Turborepo** as our monorepo scheduler tool. 

## Rationale
- **Remote Caching**: Enables builds and tests to skip executions if files didn't change.
- **Dependency Pipeline**: Coordinates package compile order automatically depending on dependency chains.
