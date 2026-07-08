export class PluginRuntime {
  private _activePlugins: string[] = [];

  public startPlugin(pluginName: string): void {
    console.log(`[PluginRuntime] Initializing plugin context: ${pluginName}`);
    this._activePlugins.push(pluginName);
  }

  public getActivePlugins(): string[] {
    return this._activePlugins;
  }
}
