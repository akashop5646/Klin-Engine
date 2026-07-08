import { PlatformRuntime } from "./PlatformRuntime";
import { PlatformState } from "./PlatformState";

export class PlatformEngine {
  private _runtime: PlatformRuntime;
  private _state: PlatformState;

  constructor(runtime: PlatformRuntime, state: PlatformState) {
    this._runtime = runtime;
    this._state = state;
  }

  public get runtime(): PlatformRuntime {
    return this._runtime;
  }

  public get state(): PlatformState {
    return this._state;
  }

  public readonly name = "platform";

  public async initialize(): Promise<void> {
    this._state.transitionTo("Booting");
    this._state.transitionTo("LoadingWorkspace");
    this._state.transitionTo("LoadingServices");
    this._state.transitionTo("Ready");
  }

  public async start(): Promise<void> {}
  public async stop(): Promise<void> {}
  public async dispose(): Promise<void> {}
}
