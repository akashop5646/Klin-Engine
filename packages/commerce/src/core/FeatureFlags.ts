export class FeatureFlags {
  private _flags: Map<string, boolean> = new Map();

  constructor() {
    this._flags.set("b2b-contracts", true);
    this._flags.set("pos-barcode-scans", true);
    this._flags.set("dynamic-reviews", true);
  }

  public isEnabled(name: string): boolean {
    return this._flags.get(name) || false;
  }
}
