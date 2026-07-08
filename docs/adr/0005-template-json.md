# ADR 0005: Declarative JSON Layout Templates

## Context
Merchant site configurations must be saved, validated, and optimized efficiently.

## Decision
We enforce a **Declarative JSON Layout format** (`template.json`) for page layouts.

## Rationale
- Safe AI generation.
- Clear structural validation against Zod schemas.
- Clean version migrations.
