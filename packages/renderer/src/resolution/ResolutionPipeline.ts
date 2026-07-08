import type { RenderTree, RenderNode } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";
import { ComponentResolver } from "./ComponentResolver";

import { SlotResolver } from "./SlotResolver";
import { ChildrenResolver } from "./ChildrenResolver";
import { Result, Ok, Err } from "@klin/core";

export class ResolutionPipeline {
  private componentResolver: ComponentResolver;
  private slotResolver = new SlotResolver();
  private childrenResolver = new ChildrenResolver();

  constructor(componentResolver: ComponentResolver) {
    this.componentResolver = componentResolver;
  }

  async resolve(
    tree: RenderTree,
    context: RendererContext
  ): Promise<Result<{ components: Map<string, any>; slots: Map<string, any> }, Error>> {
    const components = new Map<string, any>();
    const slots = new Map<string, any>();

    // 1. Resolve components recursively
    for (const node of tree.root) {
      const compRes = await this.componentResolver.resolveBlockComponent(node.blockId, context);
      if (compRes) {
        components.set(node.blockId, compRes);
      }

      if (node.slots) {
        for (const slotNodes of Object.values(node.slots)) {
          for (const sNode of (slotNodes as RenderNode[])) {
            const subComp = await this.componentResolver.resolveBlockComponent(sNode.blockId, context);
            if (subComp) {
              components.set(sNode.blockId, subComp);
            }
          }
        }
      }

      // Resolve children recursively
      if (node.children) {
        for (const child of node.children) {
          const subComp = await this.componentResolver.resolveBlockComponent(child.blockId, context);
          if (subComp) {
            components.set(child.blockId, subComp);
          }
        }
      }
    }

    return new Ok({ components, slots });
  }
}
