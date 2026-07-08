import type { RendererLifecycleState } from "../core/RendererLifecycle";

export type RenderHookListener = (state: RendererLifecycleState) => void;

export class RenderHooks {
  private listeners: Map<string, Set<RenderHookListener>> = new Map();

  on(event: string, listener: RenderHookListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }

  trigger(event: string, state: RendererLifecycleState): void {
    const list = this.listeners.get(event);
    if (!list) return;
    for (const listener of list) {
      try {
        listener(state);
      } catch (err) {
        console.error(`RenderHooks trigger error for [${event}]:`, err);
      }
    }
  }
}
