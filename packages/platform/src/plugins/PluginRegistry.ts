import { PlatformPlugin } from "./PlatformPlugin";

export class PluginRegistry {
  private _plugins: Map<string, PlatformPlugin> = new Map();
  private _isFrozen: boolean = false;

  public register(plugin: PlatformPlugin): void {
    if (this._isFrozen) {
      throw new Error("Cannot register plugin: PluginRegistry is frozen.");
    }
    this._plugins.set(plugin.id, plugin);
  }

  public freeze(): void {
    this._isFrozen = true;
  }

  public get(id: string): PlatformPlugin | undefined {
    return this._plugins.get(id);
  }
}
