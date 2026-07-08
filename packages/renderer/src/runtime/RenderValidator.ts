import type { RenderTree, RenderNode } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";
import { Result, Ok } from "@klin/core";

export class RenderValidator {
  async validate(tree: RenderTree, context: RendererContext): Promise<Result<string[], Error>> {
    const warnings: string[] = [];

    // 1. Check tree structure
    if (!tree.root || tree.root.length === 0) {
      warnings.push("RenderTree root has no layout nodes.");
      return new Ok(warnings);
    }

    // 2. Check each node recursively
    await this.validateNodes(tree.root, context, warnings);

    return new Ok(warnings);
  }

  private async validateNodes(
    nodes: RenderNode[],
    context: RendererContext,
    warnings: string[]
  ): Promise<void> {
    for (const node of nodes) {
      // Check component resolver mapping
      const component = await context.registry.resolve("block", node.blockId);
      if (!component) {
        warnings.push(`Block Component [${node.blockId}] not resolved in Registry.`);
      }

      if (node.children) {
        await this.validateNodes(node.children, context, warnings);
      }
      if (node.slots) {
        for (const [key, slotNodes] of Object.entries(node.slots)) {
          const arr = slotNodes as RenderNode[];
          if (!arr || arr.length === 0) {
            warnings.push(`Slot [${key}] on Node [${node.id}] is empty.`);
          } else {
            await this.validateNodes(arr, context, warnings);
          }
        }
      }
    }
  }
}
