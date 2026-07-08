export const PAGE_EVENTS = {
  PAGE_CREATED: "page.created",
  PAGE_LOADED: "page.loaded",
  PAGE_SAVED: "page.saved",
  PAGE_VALIDATED: "page.validated",
  PAGE_RENDER_TREE_GENERATED: "page.render-tree.generated",
  PAGE_PUBLISH_STARTED: "page.publish.started",
  PAGE_PUBLISHED: "page.published",
  PAGE_ARCHIVED: "page.archived",
  PAGE_DELETED: "page.deleted",
  PAGE_ROUTE_CHANGED: "page.route.changed",
  PAGE_SEO_UPDATED: "page.seo.updated",
  PAGE_RESTORED: "page.restored",
} as const;

export type PageEventType = (typeof PAGE_EVENTS)[keyof typeof PAGE_EVENTS];

export interface PageEventPayload {
  pageId: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export function createPageEvent(pageId: string, data?: Record<string, unknown>): PageEventPayload {
  return {
    pageId,
    timestamp: Date.now(),
    data,
  };
}
