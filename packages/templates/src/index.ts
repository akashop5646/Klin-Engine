export { TemplateLifecycle } from "./core/TemplateLifecycle";
export type { TemplateLifecycleState, TemplateLifecycleListener } from "./core/TemplateLifecycle";
export type { TemplateContext } from "./core/TemplateContext";
export { TemplateInstance, TemplateFactory } from "./core/TemplateFactory";
export { TemplateManager } from "./core/TemplateManager";
export { TemplatesEngine } from "./core/TemplatesEngine";

export type { TemplateManifest } from "./contracts/TemplateManifest";
export type { TemplateSchema } from "./contracts/TemplateSchema";
export type { TemplateMetadata } from "./contracts/TemplateMetadata";
export type { AITemplateMetadata } from "./contracts/AITemplateMetadata";
export type { MarketplaceMetadata } from "./contracts/MarketplaceMetadata";

export type { LayoutNode } from "./composition/LayoutTree";
export { LayoutTree } from "./composition/LayoutTree";
export { SectionManager } from "./composition/SectionManager";
export { BlockResolver } from "./composition/BlockResolver";

export { TemplateInheritance } from "./inheritance/TemplateInheritance";

export { TemplateRenderer } from "./runtime/TemplateRenderer";
export type { TemplateRendererProps } from "./runtime/TemplateRenderer";
export { TemplateValidator } from "./runtime/TemplateValidator";
export { TemplateHooks } from "./runtime/TemplateHooks";
export type { TemplateHookFn, TemplateHookContext, TemplateHookName } from "./runtime/TemplateHooks";
export { TEMPLATE_EVENTS, createTemplateEvent } from "./runtime/TemplateEvents";
export type { TemplateEventType, TemplateEventPayload } from "./runtime/TemplateEvents";

export type { TemplateVariant, TemplateVariantDefinition } from "./variants/TemplateVariantEngine";
export { TemplateVariantEngine } from "./variants/TemplateVariantEngine";

export { TemplatePreview, PREVIEW_VIEWPORTS } from "./preview/TemplatePreview";
export type { PreviewViewport, PreviewConfig, PreviewSnapshot } from "./preview/TemplatePreview";

export type { TemplateVersionDescriptor, VersionedTemplate } from "./version/TemplateVersion";
export { createVersion, isVersionCompatible } from "./version/TemplateVersion";
export { MigrationEngine } from "./version/MigrationEngine";
export type { MigrationStep, MigrationFn } from "./version/MigrationEngine";
export { TemplateSerializer } from "./serialization/TemplateSerializer";
export { TemplateDeserializer } from "./serialization/TemplateDeserializer";

// Force trigger language server refresh

