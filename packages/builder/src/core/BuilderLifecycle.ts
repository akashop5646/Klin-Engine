export type BuilderState =
  | "Created"
  | "LoadingWebsite"
  | "LoadingTheme"
  | "LoadingPages"
  | "LoadingData"
  | "LoadingAssets"
  | "InitializingCanvas"
  | "Ready"
  | "Editing"
  | "Saving"
  | "Publishing"
  | "Disposed";

export class BuilderLifecycle {
  private _state: BuilderState = "Created";
  private _listeners: Set<(state: BuilderState) => void> = new Set();

  public get state(): BuilderState {
    return this._state;
  }

  public transitionTo(nextState: BuilderState): void {
    if (this._state === "Disposed") {
      throw new Error("Cannot transition from Disposed state");
    }
    this._state = nextState;
    this._listeners.forEach((listener) => listener(nextState));
  }

  public subscribe(listener: (state: BuilderState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }
}
