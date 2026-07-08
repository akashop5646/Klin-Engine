export class PluginRuntime {
  public executePluginCode(pluginId: string, sandboxScope: Record<string, any>): void {
    console.log(`Executing plugin code for [${pluginId}] inside V8 isolation context`);
  }
}
