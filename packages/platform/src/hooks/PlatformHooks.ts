export class PlatformHooks {
  private _hooks: Map<string, Array<() => Promise<void>>> = new Map();
  private _isFrozen: boolean = false;

  public registerHook(name: string, callback: () => Promise<void>): void {
    if (this._isFrozen) {
      throw new Error("Cannot register hook callback: PlatformHooks list is frozen.");
    }
    if (!this._hooks.has(name)) {
      this._hooks.set(name, []);
    }
    this._hooks.get(name)!.push(callback);
  }

  public freeze(): void {
    this._isFrozen = true;
  }

  public async triggerHook(name: string): Promise<void> {
    const list = this._hooks.get(name) || [];
    for (const cb of list) {
      await cb();
    }
  }
}
