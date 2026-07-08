export class FeatureFlags {
  private _flags: Map<string, boolean> = new Map();
  private _isFrozen: boolean = false;

  constructor() {
    this._flags.set("event-sourcing", true);
    this._flags.set("distributed-cache", true);
    this._flags.set("distributed-locks", true);
  }

  public freeze(): void {
    this._isFrozen = true;
  }

  public isEnabled(flagName: string): boolean {
    return this._flags.get(flagName) || false;
  }

  public set(flagName: string, enabled: boolean): void {
    if (this._isFrozen) {
      throw new Error("Cannot modify FeatureFlags: they are frozen after platform booting completes.");
    }
    this._flags.set(flagName, enabled);
  }
}
