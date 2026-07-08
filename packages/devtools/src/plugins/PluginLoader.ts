import { PluginManifest } from "./PluginManifest";
import { PluginCapability } from "./PluginCapability";

export class PluginLoader {
  public loadPlugin(manifest: PluginManifest): boolean {
    console.log(`[PluginLoader] Loading plugin: ${manifest.name}`);
    for (const cap of manifest.capabilities) {
      if (!Object.values(PluginCapability).includes(cap as PluginCapability)) {
        console.warn(`[PluginLoader] Unknown capability: ${cap} requested by plugin: ${manifest.name}`);
        return false;
      }
    }
    return true;
  }
}
