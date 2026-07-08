import type { RenderNode } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";

export class SlotResolver {
  resolveSlotNodes(node: RenderNode, slotName: string): RenderNode[] {
    if (!node.slots) return [];
    return node.slots[slotName] ?? [];
  }
}
