export type LifecycleState =
  | "Created"
  | "Initializing"
  | "Loading Project"
  | "Ready"
  | "Editing"
  | "Saving"
  | "Disposed";

export type LifecycleListener = (state: LifecycleState) => void;

export class BuilderLifecycle {
  private currentState: LifecycleState = "Created";
  private listeners: Set<LifecycleListener> = new Set();

  getState(): LifecycleState {
    return this.currentState;
  }

  transitionTo(newState: LifecycleState) {
    if (this.currentState === "Disposed") {
      throw new Error("Cannot transition from Disposed state");
    }
    this.currentState = newState;
    this.notify();
  }

  subscribe(listener: LifecycleListener): () => void {
    this.listeners.add(listener);
    listener(this.currentState);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentState);
      } catch (err) {
        console.error("Lifecycle listener error:", err);
      }
    });
  }

  dispose() {
    this.transitionTo("Disposed");
    this.listeners.clear();
  }
}
