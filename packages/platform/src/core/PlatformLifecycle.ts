import { PlatformStateName } from "./PlatformState";

export class PlatformLifecycle {
  private _state: PlatformStateName = "Created";

  public transitionTo(state: PlatformStateName): void {
    this._state = state;
  }

  public get state(): PlatformStateName {
    return this._state;
  }
}
