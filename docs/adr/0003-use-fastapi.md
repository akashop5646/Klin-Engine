# ADR 0003: Use FastAPI for Core Gateway Microservice

## Context
Klin requires a fast and type-safe API gateway to forward requests to identity, publishing, search, and commerce engines.

## Decision
We choose **FastAPI** as the API gateway engine (`services/gateway/`).

## Rationale
- High performance.
- Automatic interactive documentation generation (OpenAPI).
- Direct alignment with Python workflows planned for layout translation utilities and AI modules.
