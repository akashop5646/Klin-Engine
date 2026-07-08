import { PlatformPlugin } from "./PlatformPlugin";

export class PluginSandbox {
  public async executeSandboxed(plugin: PlatformPlugin, action: () => Promise<void>): Promise<void> {
    console.log(`PluginSandbox starting sandboxed execution for plugin: ${plugin.id}`);
    try {
      await action();
    } catch (err) {
      console.error(`PluginSandbox caught sandboxed error for plugin ${plugin.id}:`, err);
    }
  }
}
