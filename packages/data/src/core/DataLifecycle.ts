export type LifecycleState =
  | "Created"
  | "Initializing"
  | "LoadingProvider"
  | "LoadingCollections"
  | "LoadingEntries"
  | "Ready"
  | "Synchronizing"
  | "Disposed";

export class DataLifecycle {
  private _state: LifecycleState = "Created";
  private _listeners: Set<(state: LifecycleState) => void> = new Set();

  public get state(): LifecycleState {
    return this._state;
  }

  public transitionTo(nextState: LifecycleState): void {
    if (this._state === "Disposed") {
      throw new Error("Cannot transition from Disposed state");
    }
    this._state = nextState;
    this._listeners.forEach((listener) => listener(nextState));
  }

  public subscribe(listener: (state: LifecycleState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  public isReady(): boolean {
    return this._state === "Ready" || this._state === "Synchronizing";
  }
}
