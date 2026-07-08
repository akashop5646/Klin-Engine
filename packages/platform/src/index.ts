// DI and Module System
export { DIContainer } from "./di/DIContainer";
export type { Lifetime, ServiceDescriptor } from "./di/DIContainer";
export { PlatformModule } from "./modules/PlatformModule";
export { WorkspaceModule } from "./modules/WorkspaceModule";
export { DeploymentModule } from "./modules/DeploymentModule";
export { PublishingModule } from "./modules/PublishingModule";
export { BillingModule } from "./modules/BillingModule";

// CQRS and Policies
export type { Command } from "./commands/Command";
export { CommandBus } from "./commands/CommandBus";
export type { CommandHandler } from "./commands/CommandBus";
export type { Query } from "./queries/Query";
export { QueryBus } from "./queries/QueryBus";
export type { QueryHandler } from "./queries/QueryBus";
export { PolicyEngine } from "./policies/PolicyEngine";
export { PublishPolicy } from "./policies/PublishPolicy";
export { DeploymentPolicy } from "./policies/DeploymentPolicy";

// Transactions and Sagas
export { PlatformTransaction } from "./transactions/PlatformTransaction";
export { TransactionManager } from "./transactions/TransactionManager";
export { TransactionStep } from "./transactions/TransactionStep";
export { CompensationStep } from "./transactions/CompensationStep";
export { Saga } from "./saga/Saga";
export { SagaStep } from "./saga/SagaStep";
export { SagaCompensation } from "./saga/SagaCompensation";

// Core Platform
export { PlatformEngine } from "./core/PlatformEngine";
export { PlatformRuntime } from "./core/PlatformRuntime";
export { ProjectRuntime } from "./core/ProjectRuntime";
export { PlatformSession } from "./core/PlatformSession";
export { PlatformState } from "./core/PlatformState";
export type { PlatformStateName } from "./core/PlatformState";
export { PlatformContext } from "./core/PlatformContext";
export { PlatformLifecycle } from "./core/PlatformLifecycle";
export { PlatformManager } from "./core/PlatformManager";
export { PlatformConfig } from "./config/PlatformConfig";
export type { PlatformConfigOptions } from "./config/PlatformConfig";
export { ConfigProvider } from "./config/ConfigProvider";
export { FeatureFlags } from "./config/FeatureFlags";

// Service Discovery and Locking
export { ServiceDiscovery } from "./services/ServiceDiscovery";
export { ServiceResolver } from "./services/ServiceResolver";
export type { ResourceLock } from "./locking/ResourceLock";
export { LockManager } from "./locking/LockManager";
export { DistributedLock } from "./locking/DistributedLock";

// Background Jobs
export type { PlatformJob } from "./jobs/PlatformJob";
export { JobQueue } from "./jobs/JobQueue";
export { JobWorker } from "./jobs/JobWorker";
export { JobScheduler } from "./jobs/JobScheduler";
export { TaskScheduler } from "./jobs/TaskScheduler";
export { TimerWheel } from "./jobs/TimerWheel";

// Workspace Management
export { Workspace } from "./workspaces/Workspace";
export { WorkspaceManager } from "./workspaces/WorkspaceManager";
export { Organization } from "./organization/Organization";
export { TeamManager } from "./organization/TeamManager";
export { MemberRole } from "./organization/MemberRole";

// Projects & Websites
export { Project } from "./projects/Project";
export { ProjectManager } from "./projects/ProjectManager";
export { ProjectTemplate } from "./projects/ProjectTemplate";
export { WebsiteManager } from "./websites/WebsiteManager";
export { WebsiteVersion } from "./websites/WebsiteVersion";
export { WebsiteSnapshot } from "./websites/WebsiteSnapshot";
export { WebsiteRelease } from "./websites/WebsiteRelease";
export { WebsiteClone } from "./websites/WebsiteClone";

// Publishing & Deployments
export { PublishManager } from "./publishing/PublishManager";
export { PublishStage } from "./publishing/PublishStage";
export { PublishPipeline } from "./publishing/PublishPipeline";
export { PublishQueue } from "./publishing/PublishQueue";
export { PublishHistory } from "./publishing/PublishHistory";
export type { PublishLog } from "./publishing/PublishHistory";
export { Deployment } from "./deployment/Deployment";
export { DeploymentManager } from "./deployment/DeploymentManager";
export type { DeploymentManifest } from "./deployment/DeploymentManifest";
export type { DeploymentProvider } from "./deployment/providers/DeploymentProvider";
export { DeploymentProviderRegistry } from "./deployment/DeploymentProviderRegistry";
export { DeploymentHistory } from "./deployment/DeploymentHistory";
export { RollbackManager } from "./deployment/RollbackManager";
export { DeploymentHealth } from "./deployment/DeploymentHealth";
export { StaticProvider } from "./deployment/providers/StaticProvider";
export { NodeProvider } from "./deployment/providers/NodeProvider";
export { DockerProvider } from "./deployment/providers/DockerProvider";
export { EdgeProvider } from "./deployment/providers/EdgeProvider";
export { CloudProvider } from "./deployment/providers/CloudProvider";
export { EnvironmentManager } from "./environments/EnvironmentManager";
export { EnvironmentVariables } from "./environments/EnvironmentVariables";

// Preview & Collaboration
export { PreviewManager } from "./preview/PreviewManager";
export { SharePreview } from "./preview/SharePreview";
export { PreviewSession } from "./preview/PreviewSession";
export { PresenceManager } from "./collaboration/PresenceManager";
export type { CursorPosition } from "./collaboration/CursorManager";
export { CursorManager } from "./collaboration/CursorManager";
export type { CanvasComment } from "./collaboration/CommentManager";
export { CommentManager } from "./collaboration/CommentManager";
export type { ActivityLog } from "./collaboration/ActivityFeed";
export { ActivityFeed } from "./collaboration/ActivityFeed";

// Versioning and Resources
export { VersionManager } from "./versioning/VersionManager";
export { DiffEngine } from "./versioning/DiffEngine";
export { MergeManager } from "./versioning/MergeManager";
export { RestoreManager } from "./versioning/RestoreManager";
export type { Resource } from "./resources/Resource";
export { ResourceManager } from "./resources/ResourceManager";
export { ResourceGraph } from "./resources/ResourceGraph";

// Secrets & Audits
export { SecretManager } from "./secrets/SecretManager";
export type { SecretProvider } from "./secrets/SecretProvider";
export { LocalSecretProvider } from "./secrets/LocalSecretProvider";
export { VaultProvider } from "./secrets/VaultProvider";
export { CloudSecretProvider } from "./secrets/CloudSecretProvider";
export type { AuditLog } from "./audit/AuditLog";
export { AuditManager } from "./audit/AuditManager";

// Cache System
export { PlatformCache } from "./cache/PlatformCache";
export type { CacheProvider } from "./cache/CacheProvider";
export { MemoryCacheProvider } from "./cache/MemoryCacheProvider";
export { RedisCacheProvider } from "./cache/RedisCacheProvider";
export { DistributedCacheProvider } from "./cache/DistributedCacheProvider";

// Events Sourcing
export { PlatformEvents } from "./events/PlatformEvents";
export type { StoredEvent } from "./events/PlatformEventStore";
export { PlatformEventStore } from "./events/PlatformEventStore";
export { PlatformEventReplay } from "./events/PlatformEventReplay";
export { PlatformAggregate } from "./events/PlatformAggregate";
export { PlatformProjection } from "./events/PlatformProjection";
export { ProjectionEngine } from "./events/ProjectionEngine";
export { ProjectProjection } from "./projections/ProjectProjection";
export { WorkspaceProjection } from "./projections/WorkspaceProjection";
export { DeploymentProjection } from "./projections/DeploymentProjection";
export { AnalyticsProjection } from "./projections/AnalyticsProjection";
export { BillingProjection } from "./projections/BillingProjection";

// Analytics & Billing & Marketplace
export { AnalyticsManager } from "./analytics/AnalyticsManager";
export { RealtimeAnalytics } from "./analytics/RealtimeAnalytics";
export { PerformanceAnalytics } from "./analytics/PerformanceAnalytics";
export { NotificationManager } from "./notifications/NotificationManager";
export { SubscriptionManager } from "./billing/SubscriptionManager";
export { UsageManager } from "./billing/UsageManager";
export { InvoiceManager } from "./billing/InvoiceManager";
export { MarketplaceInstaller } from "./marketplace/MarketplaceInstaller";
export type { PlatformPlugin } from "./plugins/PlatformPlugin";
export { PluginRegistry } from "./plugins/PluginRegistry";
export { PluginSandbox } from "./plugins/PluginSandbox";
export { GithubIntegration } from "./integrations/GithubIntegration";
export { WorkflowEngine } from "./automation/WorkflowEngine";

// Observability and Telemetry
export { Tracer } from "./observability/Tracer";
export { Logger } from "./observability/Logger";
export { Telemetry } from "./observability/Telemetry";

// Diagnostics
export { PlatformMetrics } from "./diagnostics/PlatformMetrics";
export { HealthCheck } from "./diagnostics/HealthCheck";
export { Heartbeat } from "./diagnostics/Heartbeat";
export { StatusPage } from "./diagnostics/StatusPage";
export { IncidentManager } from "./diagnostics/IncidentManager";
export { PlatformProfiler } from "./diagnostics/PlatformProfiler";
export { PlatformInspector } from "./diagnostics/PlatformInspector";
export { RuntimeSnapshot } from "./diagnostics/RuntimeSnapshot";

// AI Subsystem
export { AIContext } from "./ai/AIContext";
export { AIActivity } from "./ai/AIActivity";
export type { AIActivityRecord } from "./ai/AIActivity";
export { AIPrompt } from "./ai/AIPrompt";
export { AIConversation } from "./ai/AIConversation";
export type { AIConversationMessage } from "./ai/AIConversation";
export { AIHistory } from "./ai/AIHistory";
export type { AIHistoryRecord } from "./ai/AIHistory";
export { AIArtifacts } from "./ai/AIArtifacts";

// API Gateway & SDK
export { PlatformGateway } from "./api/PlatformGateway";
export { ApiRouter } from "./api/ApiRouter";
export { ApiRateLimiter } from "./api/ApiRateLimiter";
export { PlatformSDK } from "./sdk/PlatformSDK";
export { PlatformMiddleware } from "./middleware/PlatformMiddleware";
export { PlatformHooks } from "./hooks/PlatformHooks";
