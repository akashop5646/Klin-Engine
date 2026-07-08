export type PageLifecycleState =
  | "Created"
  | "Loading"
  | "Resolving Template"
  | "Resolving Blocks"
  | "Resolving Theme"
  | "Validating"
  | "Ready"
  | "Editing"
  | "Saving"
  | "Publishing"
  | "Archived"
  | "Disposed";

export type PageLifecycleListener = (state: PageLifecycleState) => void;

export class PageLifecycle {
  private currentState: PageLifecycleState = "Created";
  private listeners: Set<PageLifecycleListener> = new Set();

  getState(): PageLifecycleState {
    return this.currentState;
  }

  transitionTo(newState: PageLifecycleState) {
    if (this.currentState === "Disposed") {
      throw new Error("Cannot transition from Disposed state");
    }
    this.currentState = newState;
    this.notify();
  }

  subscribe(listener: PageLifecycleListener): () => void {
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
        console.error("PageLifecycle listener error:", err);
      }
    });
  }

  dispose() {
    this.transitionTo("Disposed");
    this.listeners.clear();
  }
}
