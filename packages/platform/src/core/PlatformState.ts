export type PlatformStateName =
  | "Created"
  | "Booting"
  | "LoadingWorkspace"
  | "LoadingServices"
  | "Ready"
  | "Publishing"
  | "Deploying"
  | "Recovering"
  | "Disposed";

export class PlatformState {
  private _currentState: PlatformStateName = "Created";

  public get currentState(): PlatformStateName {
    return this._currentState;
  }

  public transitionTo(newState: PlatformStateName): void {
    if (this._currentState === "Disposed") {
      throw new Error("Cannot transition states on a disposed Platform runtime.");
    }
    console.log(`PlatformState transition: [${this._currentState}] -> [${newState}]`);
    this._currentState = newState;
  }
}
