# Klin Package Guide

This document acts as the standardized blueprint for creating, testing, registering, and releasing packages within the Klin platform monorepo.

---

## 1. Naming Rules

- **Scope**: All platform engine and execution packages must be scoped under the `@klin` namespace.
- **Directory**: Place packages in the `packages/` workspace root directory. Use lowercase Kebab-case naming (e.g. `packages/command-engine/`).
- **Package name**: Must match the folder directory (e.g. `"name": "@klin/command-engine"`).

---

## 2. Required Files Structure

Every package must contain:
```
packages/my-new-package/
├── src/
│   ├── index.ts          # Consolidated entrypoint
│   └── ...               # Implementation modules
├── package.json          # Workspace configuration
├── tsconfig.json         # Inherited compilation targets
└── README.md             # Architecture and guidelines
```

---

## 3. Public API Rules

- **Strict encapsulation**: Consumers must only import from the package entry point. Direct imports from nested files (e.g. `@klin/command-engine/src/core/CommandEngine`) are forbidden.
- **Exports control**: Only classes, interfaces, and helpers intended for external use should be exported in the main `src/index.ts` file.

---

## 4. Manifest Rules & Registry Registration

Every runtime extension package must provide a manifest file matching the schema:
```json
{
  "id": "package_id",
  "name": "Unique Name",
  "version": "1.0.0",
  "type": "component | block | template | theme | plugin | extension",
  "assets": [
    { "id": "asset_id", "name": "Asset Name" }
  ]
}
```
All assets must be registered dynamically through the `Registry.register(manifest)` method.

---

## 5. Testing Requirements

- **Unit tests**: Test scripts must exist inside a `testing/` or `__tests__/` directory.
- **Result assertion**: Assert output results using standard monadic checks matching `@klin/core`'s `Result` type (`result.ok`, `result.value`, `result.error`).

---

## 6. Release Checklist

1. Run dependencies verification audits to check imports path boundaries.
2. Build typescript targets locally: `npm run build` inside the package directory.
3. Validate there are **0 lint or compilation warnings**.
4. Confirm package is registered in root workspaces configurations.
