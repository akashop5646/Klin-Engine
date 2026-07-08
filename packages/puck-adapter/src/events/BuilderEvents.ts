export const BuilderEvents = {
  INITIALIZED: "builder.initialized",
  LOADED: "builder.loaded",
  SELECTION_CHANGED: "builder.selection.changed",
  COMPONENT_SELECTED: "builder.component.selected",
  COMPONENT_ADDED: "builder.component.added",
  COMPONENT_DELETED: "builder.component.deleted",
  COMPONENT_UPDATED: "builder.component.updated",
  COMPONENT_MOVED: "builder.component.moved",
  DRAG_STARTED: "builder.drag.started",
  DRAG_FINISHED: "builder.drag.finished",
  SAVED: "builder.saved",
  PUBLISH_STARTED: "builder.publish.started",
  PUBLISH_COMPLETED: "builder.publish.completed",
  FAILED: "builder.failed",
} as const;

export type BuilderEventType = typeof BuilderEvents[keyof typeof BuilderEvents];
