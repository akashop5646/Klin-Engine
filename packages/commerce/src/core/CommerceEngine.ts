import { CommerceRuntime } from "./CommerceRuntime";
import { CommerceState } from "./CommerceState";

export class CommerceEngine {
  private _runtime: CommerceRuntime;
  private _state: CommerceState;

  constructor(runtime: CommerceRuntime, state: CommerceState) {
    this._runtime = runtime;
    this._state = state;
  }

  public get runtime(): CommerceRuntime {
    return this._runtime;
  }

  public get state(): CommerceState {
    return this._state;
  }

  public readonly name = "commerce";

  public async initialize(): Promise<void> {
    this._state.transitionTo("Booting");
    this._state.transitionTo("LoadingCatalog");
    this._state.transitionTo("LoadingInventory");
    this._state.transitionTo("LoadingPricing");
    this._state.transitionTo("Ready");
  }

  public async start(): Promise<void> {}
  public async stop(): Promise<void> {}
  public async dispose(): Promise<void> {}
}
