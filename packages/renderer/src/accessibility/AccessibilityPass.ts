import type { RenderTree, RenderNode } from "@klin/pages";
import { ContrastValidator } from "./ContrastValidator";
import { ARIAResolver } from "./ARIAResolver";
import { Result, Ok } from "@klin/core";

export class AccessibilityPass {
  private contrastValidator = new ContrastValidator();
  private ariaResolver = new ARIAResolver();

  async process(tree: RenderTree): Promise<Result<RenderTree, Error>> {
    const root = this.processNodes(tree.root);
    return new Ok({
      ...tree,
      root,
    });
  }

  private processNodes(nodes: RenderNode[]): RenderNode[] {
    return nodes.map((node) => {
      let updatedNode = { ...node };

      // 1. Run ARIA Resolver
      updatedNode = this.ariaResolver.resolveARIA(updatedNode);

      // 2. Validate Contrast
      this.contrastValidator.validateContrast(updatedNode);

      if (updatedNode.children) {
        updatedNode.children = this.processNodes(updatedNode.children);
      }

      if (updatedNode.slots) {
        const slots: Record<string, RenderNode[]> = {};
        for (const [key, value] of Object.entries(updatedNode.slots)) {
          slots[key] = this.processNodes(value as RenderNode[]);
        }
        updatedNode.slots = slots;
      }

      return updatedNode;
    });
  }
}
