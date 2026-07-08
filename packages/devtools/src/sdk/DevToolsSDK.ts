import { DevToolsEngine } from "../core/DevToolsEngine";
import { DevToolsManager } from "../core/DevToolsManager";

export class DevToolsSDK {
  private _engine: DevToolsEngine;
  private _manager: DevToolsManager;

  constructor(engine: DevToolsEngine, manager: DevToolsManager) {
    this._engine = engine;
    this._manager = manager;
  }

  public get engine(): DevToolsEngine {
    return this._engine;
  }

  public get manager(): DevToolsManager {
    return this._manager;
  }
}
