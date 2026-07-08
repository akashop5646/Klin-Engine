export class EnvironmentVariables {
  private _vars: Map<string, Map<string, string>> = new Map();

  public setVar(stage: string, key: string, value: string): void {
    if (!this._vars.has(stage)) {
      this._vars.set(stage, new Map());
    }
    this._vars.get(stage)!.set(key, value);
  }

  public getVar(stage: string, key: string): string | undefined {
    return this._vars.get(stage)?.get(key);
  }
}
