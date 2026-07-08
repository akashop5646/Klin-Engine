import { DevToolsRuntime } from "./DevToolsRuntime";
import { DevToolsState } from "./DevToolsState";

export class DevToolsEngine {
  private _runtime: DevToolsRuntime;
  private _state: DevToolsState;

  constructor(runtime: DevToolsRuntime, state: DevToolsState) {
    this._runtime = runtime;
    this._state = state;
  }

  public get runtime(): DevToolsRuntime {
    return this._runtime;
  }

  public get state(): DevToolsState {
    return this._state;
  }

  public readonly name = "devtools";

  public async initialize(): Promise<void> {
    this._state.transitionTo("Booting");
    this._state.transitionTo("ScanningWorkspace");
    this._state.transitionTo("LoadingPlugins");
    this._state.transitionTo("Ready");
    this._runtime.freeze();
  }

  public async start(): Promise<void> {}
  public async stop(): Promise<void> {}
  public async dispose(): Promise<void> {}
}
