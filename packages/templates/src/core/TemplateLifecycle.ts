export type TemplateLifecycleState =
  | "Created"
  | "Loading"
  | "Resolving Blocks"
  | "Resolving Theme"
  | "Validating"
  | "Rendering"
  | "Mounted"
  | "Updating"
  | "Disposed";

export type TemplateLifecycleListener = (state: TemplateLifecycleState) => void;

export class TemplateLifecycle {
  private currentState: TemplateLifecycleState = "Created";
  private listeners: Set<TemplateLifecycleListener> = new Set();

  getState(): TemplateLifecycleState {
    return this.currentState;
  }

  transitionTo(newState: TemplateLifecycleState) {
    if (this.currentState === "Disposed") {
      throw new Error("Cannot transition from Disposed state");
    }
    this.currentState = newState;
    this.notify();
  }

  subscribe(listener: TemplateLifecycleListener): () => void {
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
        console.error("TemplateLifecycle listener error:", err);
      }
    });
  }

  dispose() {
    this.transitionTo("Disposed");
    this.listeners.clear();
  }
}
