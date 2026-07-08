export type DevToolsStateName =
  | "Created"
  | "Booting"
  | "ScanningWorkspace"
  | "LoadingPlugins"
  | "Ready"
  | "Building"
  | "Watching"
  | "Disposed";

export class DevToolsState {
  private _currentState: DevToolsStateName = "Created";

  public get currentState(): DevToolsStateName {
    return this._currentState;
  }

  public transitionTo(newState: DevToolsStateName): void {
    if (this._currentState === "Disposed") {
      throw new Error("Cannot transition states on a disposed DevTools engine.");
    }
    console.log(`DevToolsState transition: [${this._currentState}] -> [${newState}]`);
    this._currentState = newState;
  }
}
