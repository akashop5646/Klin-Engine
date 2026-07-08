export type BlockLifecycleState =
  | "Created"
  | "Loading"
  | "Resolving Components"
  | "Resolving Theme"
  | "Validating"
  | "Rendering"
  | "Mounted"
  | "Updating"
  | "Unmounted"
  | "Disposed";

export type BlockLifecycleListener = (state: BlockLifecycleState) => void;

export class BlockLifecycle {
  private currentState: BlockLifecycleState = "Created";
  private listeners: Set<BlockLifecycleListener> = new Set();

  getState(): BlockLifecycleState {
    return this.currentState;
  }

  transitionTo(newState: BlockLifecycleState) {
    if (this.currentState === "Disposed") {
      throw new Error("Cannot transition from Disposed state");
    }
    this.currentState = newState;
    this.notify();
  }

  subscribe(listener: BlockLifecycleListener): () => void {
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
        console.error("BlockLifecycle listener error:", err);
      }
    });
  }

  dispose() {
    this.transitionTo("Disposed");
    this.listeners.clear();
  }
}
