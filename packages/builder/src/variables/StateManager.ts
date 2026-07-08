export class StateManager {
  private _state: Record<string, any> = {};

  public set(key: string, val: any): void {
    this._state[key] = val;
  }

  public get(key: string): any {
    return this._state[key];
  }

  public getFullState(): Record<string, any> {
    return this._state;
  }
}
