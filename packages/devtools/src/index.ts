// ============================================================================
// @klin/devtools — Developer Tools Engine (Enterprise v1.4 Final)
// ============================================================================

// ── DI Container ─────────────────────────────────────────────────────────────
export { DIContainer } from "./di/DIContainer";
export type { Lifetime, ServiceDescriptor } from "./di/DIContainer";

// ── Core Engine ──────────────────────────────────────────────────────────────
export { DevToolsEngine } from "./core/DevToolsEngine";
export { DevToolsRuntime } from "./core/DevToolsRuntime";
export { DevToolsContext } from "./core/DevToolsContext";
export { DevToolsState } from "./core/DevToolsState";
export type { DevToolsStateName } from "./core/DevToolsState";
export { DevToolsManager } from "./core/DevToolsManager";

// ── Configuration ────────────────────────────────────────────────────────────
export { ConfigurationLoader } from "./config/ConfigurationLoader";
export type { ConfigurationSchema } from "./config/ConfigurationSchema";
export { ConfigurationValidator } from "./config/ConfigurationValidator";
export { EnvironmentResolver } from "./config/EnvironmentResolver";

// ── Workspace ────────────────────────────────────────────────────────────────
export { WorkspaceLock } from "./workspace/WorkspaceLock";
export { WorkspaceSnapshot } from "./workspace/WorkspaceSnapshot";
export type { WorkspaceSnapshotData } from "./workspace/WorkspaceSnapshot";
export { WorkspaceScanner } from "./workspace/WorkspaceScanner";
export type { WorkspaceMeta } from "./workspace/WorkspaceScanner";
export { PackageResolver } from "./workspace/PackageResolver";
export { WorkspaceGraph } from "./workspace/WorkspaceGraph";
export { ProjectResolver } from "./workspace/ProjectResolver";
export { DependencyResolver } from "./workspace/DependencyResolver";

// ── CLI Command Framework ────────────────────────────────────────────────────
export { Command } from "./cli/Command";
export type { CommandOption } from "./cli/Command";
export { CommandRegistry } from "./cli/CommandRegistry";
export { CLI } from "./cli/CLI";
export { CLIProgress } from "./cli/CLIProgress";
export { HelpCommand } from "./cli/HelpCommand";
export { DoctorCommand } from "./cli/DoctorCommand";
export { VersionCommand } from "./cli/VersionCommand";
export { ConfigCommand } from "./cli/ConfigCommand";
export { CompletionCommand } from "./cli/CompletionCommand";

// ── Dependency Graph Engine ──────────────────────────────────────────────────
export { DependencyGraph } from "./graph/DependencyGraph";
export type { DependencyNode } from "./graph/DependencyGraph";
export { PackageGraph } from "./graph/PackageGraph";
export { ModuleGraph } from "./graph/ModuleGraph";
export { CircularDependencyDetector } from "./graph/CircularDependencyDetector";
export { ImpactAnalyzer } from "./graph/ImpactAnalyzer";
export { BuildPlanner } from "./graph/BuildPlanner";
export type { BuildPlan } from "./graph/BuildPlanner";
export { BuildScheduler } from "./graph/BuildScheduler";

// ── Task Execution Engine ────────────────────────────────────────────────────
export { WorkerPool } from "./tasks/WorkerPool";
export { Task } from "./tasks/Task";
export type { TaskStatus, TaskContext } from "./tasks/Task";
export { TaskRunner } from "./tasks/TaskRunner";
export { TaskPipeline } from "./tasks/TaskPipeline";
export { TaskExecutor } from "./tasks/TaskExecutor";
export { TaskReporter } from "./tasks/TaskReporter";

// ── Cache ────────────────────────────────────────────────────────────────────
export { WorkspaceCache } from "./cache/WorkspaceCache";
export { FileHashCache } from "./cache/FileHashCache";
export { BuildArtifactCache } from "./cache/BuildArtifactCache";
export { RegistryCache } from "./cache/RegistryCache";

// ── Build Event Bus ──────────────────────────────────────────────────────────
export { BuildEventBus } from "./events/BuildEventBus";
export type { BuildEventName, BuildEvent, BuildEventListener } from "./events/BuildEventBus";

// ── Generators ───────────────────────────────────────────────────────────────
export { ProjectGenerator } from "./generator/ProjectGenerator";
export { TemplateGenerator } from "./generator/TemplateGenerator";
export { ThemeGenerator } from "./generator/ThemeGenerator";
export { PluginGenerator } from "./generator/PluginGenerator";
export { BlockGenerator } from "./generator/BlockGenerator";
export { WorkspaceGenerator } from "./generator/WorkspaceGenerator";

// ── Dev Server ───────────────────────────────────────────────────────────────
export { DevServer } from "./devserver/DevServer";
export { HotReload } from "./devserver/HotReload";
export { LiveReload } from "./devserver/LiveReload";
export { FileWatcher } from "./devserver/FileWatcher";
export { AssetWatcher } from "./devserver/AssetWatcher";
export { WorkspaceWatcher } from "./devserver/WorkspaceWatcher";

// ── Build System ─────────────────────────────────────────────────────────────
export { BuildSession } from "./build/BuildSession";
export { BuildTimeline } from "./build/BuildTimeline";
export type { TimeRecord } from "./build/BuildTimeline";
export { BuildManifest } from "./build/BuildManifest";
export type { BuildManifestData } from "./build/BuildManifest";
export { ArtifactRegistry } from "./build/ArtifactRegistry";
export type { BuildArtifact } from "./build/ArtifactRegistry";
export { ArtifactGraph } from "./build/ArtifactGraph";
export { ArtifactMetadata } from "./build/ArtifactMetadata";
export type { ArtifactMetadataRecord } from "./build/ArtifactMetadata";
export { BuildPipeline } from "./build/BuildPipeline";
export { BuildManager } from "./build/BuildManager";
export { BundleManager } from "./build/BundleManager";
export { ManifestGenerator } from "./build/ManifestGenerator";
export { BuildCache } from "./build/BuildCache";
export { IncrementalBuilder } from "./build/IncrementalBuilder";
export { SourceMapGenerator } from "./build/SourceMapGenerator";
export type { BuildProfile, BuildProfileSettings } from "./build/BuildProfile";
export { BUILD_PROFILE_SETTINGS } from "./build/BuildProfile";

// ── AST Converters ───────────────────────────────────────────────────────────
export { ASTParser } from "./convert/ASTParser";
export type { ASTNode } from "./convert/ASTParser";
export { ComponentScanner } from "./convert/ComponentScanner";
export { ConvertManager } from "./convert/ConvertManager";
export { RegistryMatcher } from "./convert/RegistryMatcher";
export { DependencyAnalyzer } from "./convert/DependencyAnalyzer";
export { ConverterBlockGenerator } from "./convert/ConverterBlockGenerator";
export { TemplateCompiler } from "./convert/TemplateCompiler";
export type { ConvertMetadata } from "./convert/ConvertMetadata";
export { ConverterReport } from "./convert/ConverterReport";

// ── Code Generation ──────────────────────────────────────────────────────────
export { CodeGenerator } from "./codegen/CodeGenerator";
export { ReactGenerator } from "./codegen/ReactGenerator";
export { NextGenerator } from "./codegen/NextGenerator";
export { RouteGenerator } from "./codegen/RouteGenerator";
export { ComponentExporter } from "./codegen/ComponentExporter";

// ── Publishing ───────────────────────────────────────────────────────────────
export { PackagePublisher } from "./publish/PackagePublisher";
export { RegistryPublisher } from "./publish/RegistryPublisher";
export { VersionManager } from "./publish/VersionManager";
export { ReleaseNotes } from "./publish/ReleaseNotes";

// ── Registries ───────────────────────────────────────────────────────────────
export { RegistryManager } from "./registry/RegistryManager";
export { PackageRegistry } from "./registry/PackageRegistry";
export type { PackageMeta } from "./registry/PackageRegistry";
export { BlockRegistry } from "./registry/BlockRegistry";
export type { BlockMeta } from "./registry/BlockRegistry";
export { ThemeRegistry } from "./registry/ThemeRegistry";
export type { ThemeMeta } from "./registry/ThemeRegistry";
export { TemplateRegistry } from "./registry/TemplateRegistry";
export type { TemplateMeta } from "./registry/TemplateRegistry";
export { PluginRegistry } from "./registry/PluginRegistry";
export type { PluginMeta } from "./registry/PluginRegistry";

// ── Validation ───────────────────────────────────────────────────────────────
export { DiagnosticRegistry } from "./validation/DiagnosticRegistry";
export type { DiagnosticDefinition } from "./validation/DiagnosticRegistry";
export { Validator } from "./validation/Validator";
export type { ValidationError } from "./validation/Validator";
export { WebsiteValidator } from "./validation/WebsiteValidator";
export { BlockValidator } from "./validation/BlockValidator";
export { ThemeValidator } from "./validation/ThemeValidator";
export { PluginValidator } from "./validation/PluginValidator";
export { DependencyValidator } from "./validation/DependencyValidator";
export { PerformanceValidator } from "./validation/PerformanceValidator";
export type { PerformanceBudgets } from "./validation/PerformanceValidator";

// ── Migrations ───────────────────────────────────────────────────────────────
export { MigrationRunner } from "./migration/MigrationRunner";
export { MigrationPlanner } from "./migration/MigrationPlanner";
export { MigrationRegistry } from "./migration/MigrationRegistry";

// ── Language Server (LSP) ────────────────────────────────────────────────────
export { LanguageServer } from "./lsp/LanguageServer";
export { CompletionProvider } from "./lsp/CompletionProvider";
export { HoverProvider } from "./lsp/HoverProvider";
export type { HoverInfo } from "./lsp/HoverProvider";
export { DefinitionProvider } from "./lsp/DefinitionProvider";
export type { DefinitionLocation } from "./lsp/DefinitionProvider";
export { DiagnosticsProvider } from "./lsp/DiagnosticsProvider";
export type { DiagnosticItem } from "./lsp/DiagnosticsProvider";

// ── Diagnostics & Profiling ──────────────────────────────────────────────────
export { DiagnosticsManager } from "./diagnostics/DiagnosticsManager";
export { DevToolsMetrics } from "./diagnostics/DevToolsMetrics";
export { BuildProfiler } from "./diagnostics/BuildProfiler";
export { CommandProfiler } from "./diagnostics/CommandProfiler";
export { MemoryInspector } from "./diagnostics/MemoryInspector";
export type { DiagnosticsReport } from "./diagnostics/DiagnosticsReport";

// ── Telemetry ────────────────────────────────────────────────────────────────
export { TelemetryManager } from "./telemetry/TelemetryManager";
export { AnonymousMetrics } from "./telemetry/AnonymousMetrics";
export { CrashReporter } from "./telemetry/CrashReporter";

// ── Middleware & Hooks ───────────────────────────────────────────────────────
export { DevToolsMiddleware } from "./middleware/DevToolsMiddleware";
export type { MiddlewareNext, DevToolsMiddlewareContext } from "./middleware/DevToolsMiddleware";
export { DevToolsHooks } from "./hooks/DevToolsHooks";
export type { HookHandler } from "./hooks/DevToolsHooks";

// ── Plugin System ────────────────────────────────────────────────────────────
export { PluginCapability } from "./plugins/PluginCapability";
export { PluginLoader } from "./plugins/PluginLoader";
export type { PluginManifest } from "./plugins/PluginManifest";
export { PluginSandbox } from "./plugins/PluginSandbox";
export { PluginRuntime } from "./plugins/PluginRuntime";
export { PluginAPI } from "./plugins/PluginAPI";

// ── Documentation Generation ─────────────────────────────────────────────────
export { DocumentationGenerator } from "./docs/DocumentationGenerator";
export { APIGenerator } from "./docs/APIGenerator";
export { ComponentDocs } from "./docs/ComponentDocs";
export { PluginDocs } from "./docs/PluginDocs";
export { ThemeDocs } from "./docs/ThemeDocs";
export { CLIDocs } from "./docs/CLIDocs";

// ── Debug Tools ──────────────────────────────────────────────────────────────
export { Inspector } from "./debug/Inspector";
export { Logger } from "./debug/Logger";
export type { LogLevel } from "./debug/Logger";
export { Profiler } from "./debug/Profiler";
export { RegistryViewer } from "./debug/RegistryViewer";
export { DebugDependencyGraph } from "./debug/DependencyGraph";
export { JsonViewer } from "./debug/JsonViewer";
export { TraceViewer } from "./debug/TraceViewer";
export type { TraceEntry } from "./debug/TraceViewer";

// ── SDK ──────────────────────────────────────────────────────────────────────
export { DevToolsSDK } from "./sdk/DevToolsSDK";
