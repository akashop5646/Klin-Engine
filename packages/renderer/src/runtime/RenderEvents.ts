export const RENDER_EVENTS = {
  STARTED: "renderer.started",
  COMPLETED: "renderer.completed",
  FAILED: "renderer.failed",
  HYDRATED: "renderer.hydrated",
  OPTIMIZED: "renderer.optimized",
  CACHED: "renderer.cached",
} as const;

export type RenderEventType = typeof RENDER_EVENTS[keyof typeof RENDER_EVENTS];

export interface RenderEventPayload {
  treeId: string;
  target: string;
  duration?: number;
  error?: string;
  timestamp: number;
}
