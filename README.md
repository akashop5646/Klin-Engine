# Klin — Next-Generation E-commerce Builder Platform

Klin is a modular, next-generation visual ecommerce builder platform designed for speed, flexibility, and extensibility.

---

## Workspace Structure

Klin is organized as a Turborepo monorepo:

- **`apps/`**: Top-level user-facing applications (Dashboard, Design-Studio storefronts).
- **`packages/`**: Monorepo libraries (UI components, theme token engines, AST compiler renderers).
- **`services/`**: Core microservices API gateway (FastAPI).
- **`tooling/`**: Linting, formatting, and compiler configs.
- **`standards/`**: Monorepo engineering standards.
- **`playbooks/`**: Developer step-by-step guides.

---

## Quick Start

### Installation

Using `pnpm`:
```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

---

## Architectural Guidelines

Please review [ARCHITECTURE.md](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/ARCHITECTURE.md) before writing any code. All component package structures must conform to the defined guidelines.
