import type { PageDefinition } from "../core/PageDefinition";
import type { Registry } from "@klin/registry";
import { Result, Ok, Err } from "@klin/core";

export interface ResolvedDependencies {
  templateId: string;
  blockIds: string[];
  components: string[];
  themeId: string;
  assetIds: string[];
}

export class PageDependencyResolver {
  private registry: Registry;

  constructor(registry: Registry) {
    this.registry = registry;
  }

  async resolve(definition: PageDefinition): Promise<Result<ResolvedDependencies, Error>> {
    try {
      const templateId = definition.templateId;
      const themeId = definition.permissions.visibility === "public" ? "default-theme" : "draft-theme";

      // 1. Resolve template dependency
      const templateRes = await this.registry.resolve("template", templateId);
      
      const blockIds: string[] = [];
      const components: string[] = [];
      const assetIds: string[] = [];

      // Add template required blocks
      if (templateRes && (templateRes as any).requiredBlocks) {
        blockIds.push(...(templateRes as any).requiredBlocks);
      }

      // Add override overrides blocks
      for (const [blockId, props] of Object.entries(definition.overrides)) {
        if (!blockIds.includes(blockId)) {
          blockIds.push(blockId);
        }
        // Extract asset references inside properties
        this.extractAssets(props, assetIds);
      }

      // Resolve components for block definitions
      for (const bId of blockIds) {
        const blockDef = await this.registry.resolve("block", bId);
        if (blockDef && (blockDef as any).components) {
          components.push(...(blockDef as any).components);
        }
      }

      return new Ok({
        templateId,
        blockIds,
        components,
        themeId,
        assetIds,
      });
    } catch (err) {
      return new Err(err as Error);
    }
  }

  private extractAssets(props: Record<string, unknown>, assetIds: string[]) {
    for (const value of Object.values(props)) {
      if (value && typeof value === "object") {
        if ((value as any).type === "image" || (value as any).type === "video") {
          const id = (value as any).id;
          if (id && !assetIds.includes(id)) {
            assetIds.push(id);
          }
        } else {
          this.extractAssets(value as Record<string, unknown>, assetIds);
        }
      }
    }
  }
}
