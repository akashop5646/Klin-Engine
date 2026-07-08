import { Registry } from "@klin/registry";
import { BuilderSchema } from "../mapper/types";
import { BuilderSchemaMapper } from "../mapper/BuilderSchemaMapper";

export class Discovery {
  static discoverComponents(registry: Registry): BuilderSchema[] {
    const componentList: any[] = [];

    // Access registry catalogs directly via cast for precise component catalog access
    const engine = (registry as any).engine;
    if (engine?.catalogs?.components) {
      componentList.push(...engine.catalogs.components.list());
    } else {
      // Fallback to search
      const items = registry.search({});
      // Filter out items that look like components (checking category or metadata keys)
      componentList.push(...items.filter(item => item.category || item.schema));
    }

    const metadataMap = (globalThis as any).__KLIN_COMPONENTS_METADATA__ || {};

    return componentList.map((item) => {
      const entry = metadataMap[item.id] || {};
      const schema = entry.schema || { componentId: item.id, fields: [] };
      const metadata = entry.metadata || { name: item.name, category: item.category || "General" };
      
      return BuilderSchemaMapper.map(schema, metadata);
    });
  }
}
