import type { IRenderer } from "../core/IRenderer";
import type { RenderTree } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";
import type { RenderResult } from "../contracts/RenderResult";

export class NativeRenderer implements IRenderer {
  readonly id = "Native";

  supports(target: string): boolean {
    return target.toLowerCase() === "native";
  }

  async render(tree: RenderTree, context: RendererContext): Promise<RenderResult> {
    const startTime = Date.now();
    const errors: Error[] = [];
    const warnings: string[] = [];

    // Native app returns structured JSON elements representation
    const nativeTree = tree.root.map((node) => ({
      viewType: node.blockId === "Container" ? "ViewGroup" : "TextView",
      id: node.id,
      attributes: node.props,
      children: node.children?.map((c) => ({
        viewType: "TextView",
        id: c.id,
        attributes: c.props,
      })),
    }));

    return {
      success: errors.length === 0,
      duration: Date.now() - startTime,
      warnings,
      errors,
      output: JSON.stringify(nativeTree, null, 2),
      metadata: {
        nodeCount: tree.root.length,
        componentCount: tree.root.length,
        optimized: true,
        cached: false,
      },
    };
  }
}
