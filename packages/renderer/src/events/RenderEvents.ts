export type RenderEvent =
  | "page.render.start"
  | "page.render.finish"
  | "block.render.start"
  | "block.render.finish"
  | "hydration.finish"
  | "render.failed"
  // Observability Hooks
  | "render.started"
  | "render.completed"
  | "hydration.completed"
  | "cache.hit"
  | "cache.miss"
  | "block.failed";

export class RenderEvents {
  private _listeners: Map<RenderEvent, Set<(payload?: any) => void>> = new Map();

  public on(event: RenderEvent, callback: (payload?: any) => void): () => void {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event)!.add(callback);
    return () => {
      this._listeners.get(event)?.delete(callback);
    };
  }

  public emit(event: RenderEvent, payload?: any): void {
    const set = this._listeners.get(event);
    if (set) {
      set.forEach((cb) => cb(payload));
    }
  }
}
