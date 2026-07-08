export interface IPlugin {
  name: string;
  version: string;
  onActivate?(runtime: any): void | Promise<void>;
  onDeactivate?(): void | Promise<void>;
}

export class PluginRegistry {
  private plugins = new Map<string, IPlugin>();

  public register(plugin: IPlugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`[Klin PluginRegistry] Plugin '${plugin.name}' is already registered.`);
    }
    this.plugins.set(plugin.name, plugin);
    console.log(`[Klin PluginRegistry] Registered plugin: ${plugin.name} v${plugin.version}`);
  }

  public get(name: string): IPlugin | undefined {
    return this.plugins.get(name);
  }

  public has(name: string): boolean {
    return this.plugins.has(name);
  }

  public getAll(): IPlugin[] {
    return Array.from(this.plugins.values());
  }
}
