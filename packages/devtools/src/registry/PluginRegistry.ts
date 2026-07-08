export interface PluginMeta {
  name: string;
  capabilities: string[];
}

export class PluginRegistry {
  private _plugins: Map<string, PluginMeta> = new Map();

  public registerPlugin(plugin: PluginMeta): void {
    this._plugins.set(plugin.name, plugin);
  }

  public getPlugin(name: string): PluginMeta | undefined {
    return this._plugins.get(name);
  }
}
