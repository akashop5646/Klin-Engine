export interface PuckGroupConfig {
  components?: string[];
  title?: string;
}

export class BuilderMetadata {
  static generateGroups(componentIds: string[]): Record<string, PuckGroupConfig> {
    const metadataMap = (globalThis as any).__KLIN_COMPONENTS_METADATA__ || {};
    const groups: Record<string, PuckGroupConfig> = {};

    for (const componentId of componentIds) {
      const entry = metadataMap[componentId];
      const groupName = entry?.builderConfig?.group || "General";
      
      if (!groups[groupName]) {
        groups[groupName] = {
          title: groupName,
          components: [],
        };
      }
      groups[groupName].components?.push(componentId);
    }

    return groups;
  }
}
