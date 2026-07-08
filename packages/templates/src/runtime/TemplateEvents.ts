export const TEMPLATE_EVENTS = {
  // Lifecycle events
  TEMPLATE_CREATED: "template.created",
  TEMPLATE_LOADING: "template.loading",
  TEMPLATE_LOADED: "template.loaded",
  TEMPLATE_MOUNTED: "template.mounted",
  TEMPLATE_UPDATED: "template.updated",
  TEMPLATE_DISPOSED: "template.disposed",
  TEMPLATE_DELETED: "template.deleted",

  // Composition events
  SECTION_ADDED: "template.section.added",
  SECTION_REMOVED: "template.section.removed",
  SECTION_MOVED: "template.section.moved",
  SECTION_UPDATED: "template.section.updated",

  // Block resolution events
  BLOCK_RESOLVED: "template.block.resolved",
  BLOCK_MISSING: "template.block.missing",
  BLOCK_REPLACED: "template.block.replaced",

  // Variant events
  VARIANT_SWITCHED: "template.variant.switched",
  VARIANT_REGISTERED: "template.variant.registered",

  // Serialization events
  TEMPLATE_SERIALIZED: "template.serialized",
  TEMPLATE_DESERIALIZED: "template.deserialized",

  // Version events
  TEMPLATE_MIGRATED: "template.migrated",
  MIGRATION_FAILED: "template.migration.failed",

  // Preview events
  PREVIEW_STARTED: "template.preview.started",
  PREVIEW_STOPPED: "template.preview.stopped",
  PREVIEW_VIEWPORT_CHANGED: "template.preview.viewport.changed",
} as const;

export type TemplateEventType = (typeof TEMPLATE_EVENTS)[keyof typeof TEMPLATE_EVENTS];

export interface TemplateEventPayload {
  templateId: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export function createTemplateEvent(
  templateId: string,
  data?: Record<string, unknown>
): TemplateEventPayload {
  return {
    templateId,
    timestamp: Date.now(),
    data,
  };
}
