import type { IRenderer } from "../core/IRenderer";
import type { RenderTree } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";
import type { RenderResult } from "../contracts/RenderResult";
import React from "react";

export class ReactRenderer implements IRenderer {
  readonly id = "React";

  supports(target: string): boolean {
    const t = target.toLowerCase();
    return t === "react" || t === "native";
  }

  async render(tree: RenderTree, context: RendererContext): Promise<RenderResult> {
    const startTime = Date.now();
    const errors: Error[] = [];
    const warnings: string[] = [];

    const elements = await Promise.all(
      tree.root.map((node) => this.renderNode(node, context, errors))
    );

    return {
      success: errors.length === 0,
      duration: Date.now() - startTime,
      warnings,
      errors,
      output: React.createElement(React.Fragment, {}, ...elements),
      metadata: {
        nodeCount: tree.root.length,
        componentCount: tree.root.length,
        optimized: true,
        cached: false,
      },
    };
  }

  private async renderNode(node: any, context: RendererContext, errors: Error[]): Promise<any> {
    try {
      const blockDef = await context.registry.resolve("block", node.blockId);
      const Component = (blockDef as any)?.component ?? (blockDef as any)?.implementation ?? "div";

      const props = {
        key: node.id,
        id: node.id,
        ...node.props,
      };

      const childrenElements: any[] = [];
      if (node.children) {
        const sub = await Promise.all(
          node.children.map((c: any) => this.renderNode(c, context, errors))
        );
        childrenElements.push(...sub);
      }

      if (node.slots) {
        const slots: Record<string, any> = {};
        for (const [key, slotNodes] of Object.entries(node.slots)) {
          const slotElements = await Promise.all(
            (slotNodes as any[]).map((sn) => this.renderNode(sn, context, errors))
          );
          slots[key] = React.createElement(React.Fragment, {}, ...slotElements);
        }
        Object.assign(props, slots);
      }

      return React.createElement(Component, props, ...childrenElements);
    } catch (err) {
      errors.push(err as Error);
      return React.createElement("div", { key: node.id, style: { color: "red" } }, `Error rendering block: ${node.blockId}`);
    }
  }
}
