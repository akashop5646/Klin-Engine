import type { RenderTree } from "./RenderTree";
import type { RenderNode } from "./RenderNode";

export class RenderTreeOptimizer {
  optimize(tree: RenderTree): RenderTree {
    const optimizedRoot = this.optimizeNodes(tree.root);
    return {
      ...tree,
      root: optimizedRoot,
    };
  }

  private optimizeNodes(nodes: RenderNode[]): RenderNode[] {
    const result: RenderNode[] = [];

    for (const node of nodes) {
      // 1. Skip empty nodes or placeholder fragments that don't render anything
      if (node.blockId === "Fragment" && (!node.children || node.children.length === 0)) {
        continue;
      }

      // 2. Collapse fragments that only have one child and no props
      if (
        node.blockId === "Fragment" &&
        Object.keys(node.props).length === 0 &&
        node.children &&
        node.children.length === 1
      ) {
        result.push(...this.optimizeNodes(node.children));
        continue;
      }

      // 3. Optimize children recursively
      const optimizedNode: RenderNode = {
        ...node,
      };

      if (node.children) {
        optimizedNode.children = this.optimizeNodes(node.children);
      }

      // 4. Optimize slots recursively
      if (node.slots) {
        const optimizedSlots: Record<string, RenderNode[]> = {};
        let hasSlots = false;
        
        for (const [key, value] of Object.entries(node.slots)) {
          const slotNodes = value as RenderNode[];
          const optimizedSlotNodes = this.optimizeNodes(slotNodes);
          if (optimizedSlotNodes.length > 0) {
            optimizedSlots[key] = optimizedSlotNodes;
            hasSlots = true;
          }
        }
        
        if (hasSlots) {
          optimizedNode.slots = optimizedSlots;
        } else {
          delete optimizedNode.slots;
        }
      }

      result.push(optimizedNode);
    }

    return result;
  }
}
