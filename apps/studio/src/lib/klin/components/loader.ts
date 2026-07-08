import { registry } from "../core/registry";
import { KlinComponentDefinition, KlinComponentManifest } from "../types/components";

export class KlinComponentLoader {
  /**
   * Resolves a component definition from the registry.
   */
  public resolve(type: string): KlinComponentDefinition | null {
    const def = registry.getComponent(type);
    if (!def) {
      console.warn(`[KlinComponentLoader] Component of type "${type}" could not be resolved.`);
      return null;
    }
    return def;
  }

  /**
   * Generates a manifest file structure of all registered components.
   */
  public generateManifest(): Record<string, KlinComponentManifest> {
    const manifest: Record<string, KlinComponentManifest> = {};
    const components = registry.getAllComponents();
    for (const comp of components) {
      manifest[comp.type] = comp.manifest;
    }
    return manifest;
  }
}

export const componentLoader = new KlinComponentLoader();
