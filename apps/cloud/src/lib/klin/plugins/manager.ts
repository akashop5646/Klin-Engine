import { KlinPlugin } from "../types/plugins";

export class KlinPluginManager {
  private plugins: Map<string, KlinPlugin> = new Map();

  /**
   * Registers and initializes a plugin.
   */
  public register(plugin: KlinPlugin): void {
    if (this.plugins.has(plugin.id)) {
      console.warn(`[KlinPluginManager] Plugin with ID "${plugin.id}" is already registered. Overwriting.`);
    }

    try {
      if (plugin.onInit) {
        plugin.onInit({ registry: this });
      }
      this.plugins.set(plugin.id, plugin);
      console.log(`[KlinPluginManager] Plugin "${plugin.name}" (v${plugin.version}) registered successfully.`);
    } catch (err) {
      console.error(`[KlinPluginManager] Failed to initialize plugin "${plugin.id}":`, err);
    }
  }

  /**
   * Unregisters and destroys a plugin.
   */
  public unregister(id: string): void {
    const plugin = this.plugins.get(id);
    if (!plugin) return;

    try {
      if (plugin.onDestroy) {
        plugin.onDestroy();
      }
      this.plugins.delete(id);
      console.log(`[KlinPluginManager] Plugin "${id}" unregistered successfully.`);
    } catch (err) {
      console.error(`[KlinPluginManager] Error during destroy for plugin "${id}":`, err);
    }
  }

  /**
   * Runs a lifecycle hook hookName across all active plugins.
   */
  public runHook<T = any>(hookName: "beforeRender" | "afterRender", initialData: T): T {
    let result = initialData;
    for (const plugin of this.plugins.values()) {
      if (plugin.hooks && plugin.hooks[hookName]) {
        try {
          const hookFn = plugin.hooks[hookName] as (data: any) => any;
          result = hookFn(result);
        } catch (err) {
          console.error(`[KlinPluginManager] Hook "${hookName}" failed in plugin "${plugin.id}":`, err);
        }
      }
    }
    return result;
  }
}

export const pluginManager = new KlinPluginManager();
