export type RendererLifecycleState =
  | "Created"
  | "Initializing"
  | "Resolving Components"
  | "Resolving Assets"
  | "Resolving Theme"
  | "Rendering"
  | "Hydrating"
  | "Completed"
  | "Disposed";

export type RendererLifecycleListener = (
  fromState: RendererLifecycleState,
  toState: RendererLifecycleState
) => void;

export class RendererLifecycle {
  private currentState: RendererLifecycleState = "Created";
  private listeners: Set<RendererLifecycleListener> = new Set();

  getState(): RendererLifecycleState {
    return this.currentState;
  }

  transitionTo(newState: RendererLifecycleState) {
    if (this.currentState === "Disposed") {
      throw new Error("Cannot transition state on a disposed Renderer instance.");
    }
    const oldState = this.currentState;
    this.currentState = newState;
    for (const listener of this.listeners) {
      try {
        listener(oldState, newState);
      } catch (err) {
        console.error("RendererLifecycle state listener error:", err);
      }
    }
  }

  addListener(listener: RendererLifecycleListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  dispose() {
    this.transitionTo("Disposed");
    this.listeners.clear();
  }
}
