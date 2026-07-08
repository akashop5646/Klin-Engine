import { CommerceStateName } from "./CommerceState";

export class CommerceLifecycle {
  private _stateName: CommerceStateName = "Created";

  public onTransition(state: CommerceStateName): void {
    this._stateName = state;
    console.log(`CommerceLifecycle triggered transition to: ${state}`);
  }

  public get state(): CommerceStateName {
    return this._stateName;
  }
}
