export const DataEvents = {
  COLLECTION_CREATED: "collection.created",
  COLLECTION_DELETED: "collection.deleted",
  ENTRY_CREATED: "entry.created",
  ENTRY_UPDATED: "entry.updated",
  ENTRY_DELETED: "entry.deleted",
  ENTRY_RESTORED: "entry.restored",
  BINDING_CREATED: "binding.created",
  BINDING_UPDATED: "binding.updated",
  BINDING_DELETED: "binding.deleted",
  QUERY_EXECUTED: "query.executed",
  PROVIDER_CONNECTED: "provider.connected",
  PROVIDER_DISCONNECTED: "provider.disconnected",
  SYNC_STARTED: "sync.started",
  SYNC_COMPLETED: "sync.completed",
} as const;

export type DataEventType = typeof DataEvents[keyof typeof DataEvents];
