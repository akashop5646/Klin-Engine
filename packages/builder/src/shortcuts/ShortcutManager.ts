export class ShortcutManager {
  private _bindings: Map<string, () => void> = new Map();

  public register(keysCombo: string, action: () => void): void {
    this._bindings.set(keysCombo, action);
  }

  public trigger(keysCombo: string): void {
    const act = this._bindings.get(keysCombo);
    if (act) act();
  }
}
