# @klin/devtools — Developer Tools Engine Architecture

## Overview

The Developer Tools Engine (`@klin/devtools`) provides the complete developer experience for Klin.
It powers the CLI, local development server, project scaffolding, build pipelines, validation,
React-to-Klin conversion, code generation, plugin development, debugging, documentation generation,
Language Server Protocol (LSP) support, and workspace management.

**DevTools never manages websites or deployments.** It provides tooling that orchestrates existing
Klin engines during development.

---

## Lifecycle Flow

```
     CLI Command Input (e.g. klin build)
               │
               ▼
       WorkspaceScanner (scans lockfiles / packages)
               │
               ▼
      ConfigurationLoader (validates klin.config.ts)
               │
               ▼
      DependencyGraph (analyzes package / file dependencies)
               │
               ▼
         BuildPlanner (computes the dependency DAG execution plan)
               │
               ▼
        BuildScheduler (executes task plan with concurrency bounds)
               │
               ▼
      TaskPipeline (Scan → Validate → Compile → Bundle → Optimize → Write)
               │
               ▼
      BuildSession (tracks buildId, timeline, diagnostics)
               │
               ▼
       ArtifactRegistry (registers JS/CSS outputs in ArtifactGraph)
               │
               ▼
     BuildManifest (writes deterministic build.json metadata)
```

---

## Package Layout

```
packages/devtools/src/
├── core/              DevToolsEngine, Runtime (freeze), State, Context, Manager
├── config/            ConfigurationLoader, Schema, Validator, EnvironmentResolver
├── di/                DIContainer (Singleton / Transient / Scoped)
├── workspace/         WorkspaceLock, Snapshot, Scanner, Resolvers, Graph
├── cli/               Command framework, CommandRegistry, CLI runner, Progress API
│   └── commands/      Help, Doctor, Version, Config, Completion
├── graph/             DependencyGraph, PackageGraph, ModuleGraph, CircularDetector
│   ├── BuildPlanner   DAG topological sort planning
│   └── BuildScheduler Concurrent execution with limits
├── tasks/             Task, Runner, Pipeline, Executor, Reporter, WorkerPool
├── cache/             WorkspaceCache, FileHashCache, BuildArtifactCache, RegistryCache
├── events/            BuildEventBus (pubsub for build lifecycle)
├── generator/         Project, Template, Theme, Plugin, Block, Workspace generators
├── devserver/         DevServer, HotReload, LiveReload, FileWatcher, AssetWatcher
├── build/             BuildSession, Timeline, Profile, Manifest, Pipeline, Manager
│   ├── ArtifactRegistry / ArtifactGraph / ArtifactMetadata
│   ├── BundleManager, ManifestGenerator, SourceMapGenerator
│   └── BuildCache, IncrementalBuilder
├── convert/           ASTParser, ComponentScanner, ConvertManager, ConverterReport
│   └── RegistryMatcher, DependencyAnalyzer, TemplateCompiler
├── codegen/           CodeGenerator, ReactGenerator, NextGenerator, RouteGenerator
├── publish/           PackagePublisher, RegistryPublisher, VersionManager, ReleaseNotes
├── registry/          RegistryManager, PackageRegistry, BlockRegistry, ThemeRegistry
├── validation/        DiagnosticRegistry (KLIN0001-KLIN9000), Validators, PerformanceBudgets
├── migration/         MigrationRunner, MigrationPlanner, MigrationRegistry
├── lsp/               LanguageServer, CompletionProvider, HoverProvider, DiagnosticsProvider
├── diagnostics/       DiagnosticsManager, Metrics, Profiler, MemoryInspector, Report
├── telemetry/         TelemetryManager, AnonymousMetrics, CrashReporter
├── middleware/        DevToolsMiddleware (before/after routing hooks)
├── hooks/             DevToolsHooks (lifecycle events: beforeBuild, afterBundle, etc.)
├── plugins/           PluginCapability enum, Loader, Manifest, Sandbox, Runtime, API
├── docs/              DocumentationGenerator, APIGenerator, ComponentDocs, CLIDocs
├── debug/             Inspector, Logger, Profiler, RegistryViewer, JsonViewer, TraceViewer
├── sdk/               DevToolsSDK (facade)
└── index.ts           Barrel exports
```

---

## Core Design Principles

| Principle                | Description                                                             |
|--------------------------|-------------------------------------------------------------------------|
| Tooling-Only Scope       | Contains no runtime rendering or visual editing logic                   |
| CLI-First                | Every capability accessible through shell commands                      |
| Deterministic Outputs    | Same project always produces identical artifacts                        |
| Plugin-Driven            | Extensions register via typed PluginCapability enum                     |
| Monorepo-Aware           | Correctly resolves pnpm / npm / yarn / bun workspaces                  |
| Build Sessions           | Every build runs in an isolated BuildSession with timeline profiling    |
| Event-Driven             | BuildEventBus decouples progress, logging, and telemetry                |
| Runtime Freeze           | DevToolsRuntime.freeze() prevents post-init mutations for determinism   |
| Diagnostic Codes         | Standardized KLIN0001–KLIN9000 codes for IDE integration                |
| Performance Budgets      | PerformanceValidator enforces bundle size, CSS, and dependency limits   |

---

## Key Subsystems

### CLI Command Framework
Every command implements the abstract `Command` class with `name`, `aliases`, `description`,
`options`, and `execute()`. Commands are registered with `CommandRegistry` and dispatched by `CLI`.

### Build System
`BuildPlanner` computes the dependency DAG. `BuildScheduler` executes batches with concurrency
limits. `TaskPipeline` runs each build phase. `BuildSession` isolates state. `BuildTimeline`
records phase durations. `ArtifactGraph` tracks input-to-output relationships.

### Plugin System
Plugins declare capabilities via the `PluginCapability` enum (CLI, Generator, Validator, etc.).
`PluginLoader` validates capabilities before activation. `PluginSandbox` isolates execution.
`PluginAPI` exposes hooks and command registration.

### Language Server Protocol
`LanguageServer` coordinates `CompletionProvider`, `HoverProvider`, `DefinitionProvider`, and
`DiagnosticsProvider` for IDE integration with klin.config.ts and block/template JSON files.

### Validation & Diagnostics
All validators extend the abstract `Validator` class and return `ValidationError` objects with
standardized KLIN diagnostic codes from `DiagnosticRegistry`. `PerformanceValidator` enforces
budgets. `DiagnosticsManager` compiles workspace health reports for `klin doctor`.
