import { Plugin } from "./Plugin";

export class PluginManager {
  private _loadedPlugins: Map<string, Plugin> = new Map();

  public loadPlugin(plugin: Plugin): void {
    this._loadedPlugins.set(plugin.manifest.id, plugin);
  }

  public getLoadedPlugins(): Plugin[] {
    return Array.from(this._loadedPlugins.values());
  }
}
