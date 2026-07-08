export interface BlockDefinition {
  id: string;
  blockId: string;
  properties: Record<string, any>;
  children?: BlockDefinition[];
}

export class OverrideResolver {
  resolve(
    templateBlocks: BlockDefinition[],
    overrides: Record<string, Record<string, unknown>>
  ): BlockDefinition[] {
    return templateBlocks.map((block) => {
      const diff = overrides[block.id];
      if (!diff) {
        if (block.children) {
          return {
            ...block,
            children: this.resolve(block.children, overrides),
          };
        }
        return block;
      }

      // Merge block properties with page overrides
      const mergedBlock: BlockDefinition = {
        ...block,
        properties: this.mergeProperties(block.properties, diff),
      };

      if (block.children) {
        mergedBlock.children = this.resolve(block.children, overrides);
      }

      return mergedBlock;
    });
  }

  private mergeProperties(
    base: Record<string, any>,
    override: Record<string, unknown>
  ): Record<string, any> {
    const result = { ...base };
    
    for (const [key, value] of Object.entries(override)) {
      if (value && typeof value === "object" && !Array.isArray(value) && result[key] && typeof result[key] === "object") {
        result[key] = this.mergeProperties(result[key], value as Record<string, unknown>);
      } else {
        result[key] = value;
      }
    }
    
    return result;
  }
}
