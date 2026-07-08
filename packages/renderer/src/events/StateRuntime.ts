export class StateRuntime {
  private _state: Record<string, any> = {};

  public update(key: string, value: any): void {
    this._state[key] = value;
  }

  public get(key: string): any {
    return this._state[key];
  }
}
