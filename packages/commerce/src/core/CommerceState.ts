export type CommerceStateName =
  | "Created"
  | "Booting"
  | "LoadingCatalog"
  | "LoadingInventory"
  | "LoadingPricing"
  | "Ready"
  | "Checkout"
  | "ProcessingPayment"
  | "Completed"
  | "Disposed";

export class CommerceState {
  private _currentState: CommerceStateName = "Created";

  public get currentState(): CommerceStateName {
    return this._currentState;
  }

  public transitionTo(newState: CommerceStateName): void {
    if (this._currentState === "Disposed") {
      throw new Error("Cannot transition states on a disposed Commerce engine.");
    }
    console.log(`CommerceState transition: [${this._currentState}] -> [${newState}]`);
    this._currentState = newState;
  }
}
