export class ActivationManager {
  private _keys: Map<string, boolean> = new Map();

  public activateKey(key: string): boolean {
    this._keys.set(key, true);
    return true;
  }

  public checkKey(key: string): boolean {
    return this._keys.get(key) || false;
  }
}
