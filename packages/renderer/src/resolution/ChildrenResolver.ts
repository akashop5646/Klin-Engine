import type { RenderNode } from "@klin/pages";

export class ChildrenResolver {
  resolveChildren(node: RenderNode): RenderNode[] {
    return node.children ?? [];
  }
}
