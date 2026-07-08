export class FeatureFlags {
  private _flags: Map<string, boolean> = new Map();

  constructor() {
    this._flags.set("streaming", true);
    this._flags.set("edge", true);
    this._flags.set("islands", true);
    this._flags.set("vdom", true);
  }

  public isEnabled(flagName: string): boolean {
    return this._flags.get(flagName) || false;
  }

  public set(flagName: string, enabled: boolean): void {
    this._flags.set(flagName, enabled);
  }
}
