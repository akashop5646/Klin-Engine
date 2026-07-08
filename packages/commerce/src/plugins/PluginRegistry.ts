import { CommercePlugin } from "./CommercePlugin";

export class PluginRegistry {
  private _plugins: Map<string, CommercePlugin> = new Map();

  public register(plugin: CommercePlugin): void {
    this._plugins.set(plugin.pluginName, plugin);
    plugin.onActivate();
  }

  public get(name: string): CommercePlugin | undefined {
    return this._plugins.get(name);
  }
}
