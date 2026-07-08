import type { IRenderer } from "../core/IRenderer";
import type { RenderTree } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";
import type { RenderResult } from "../contracts/RenderResult";
import { ThemeResolver } from "../styles/ThemeResolver";
import { StyleInjector } from "../styles/StyleInjector";

export class HTMLRenderer implements IRenderer {
  readonly id = "HTML";
  private themeResolver = new ThemeResolver();
  private styleInjector = new StyleInjector();

  supports(target: string): boolean {
    const t = target.toLowerCase();
    return t === "html" || t === "static" || t === "ssr";
  }

  async render(tree: RenderTree, context: RendererContext): Promise<RenderResult> {
    const startTime = Date.now();
    const errors: Error[] = [];
    const warnings: string[] = [];

    // 1. Resolve theme CSS variables
    const themeId = tree.themeId || "default-theme";
    const css = await this.themeResolver.resolveThemeCss(themeId, context);
    const styleTag = this.styleInjector.injectStyles(css, context) ?? "";

    // 2. Generate HTML string recursively
    const bodyHtml = await Promise.all(
      tree.root.map((node) => this.renderNode(node, context, errors))
    );

    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${styleTag}
</head>
<body>
  <div id="klin-root">
    ${bodyHtml.join("\n    ")}
  </div>
</body>
</html>`;

    return {
      success: errors.length === 0,
      duration: Date.now() - startTime,
      warnings,
      errors,
      output: fullHtml,
      metadata: {
        nodeCount: tree.root.length,
        componentCount: tree.root.length,
        optimized: true,
        cached: false,
      },
    };
  }

  private async renderNode(node: any, context: RendererContext, errors: Error[]): Promise<string> {
    try {
      const blockId = node.blockId.toLowerCase();
      const idAttr = node.id ? ` id="${node.id}"` : "";

      // Construct attributes string
      let attrs = "";
      for (const [key, value] of Object.entries(node.props)) {
        if (typeof value === "string") {
          attrs += ` ${key}="${value}"`;
        }
      }

      let childrenHtml = "";
      if (node.children) {
        const sub = await Promise.all(
          node.children.map((c: any) => this.renderNode(c, context, errors))
        );
        childrenHtml += sub.join("");
      }

      if (node.slots) {
        for (const [key, slotNodes] of Object.entries(node.slots)) {
          const slotHtml = await Promise.all(
            (slotNodes as any[]).map((sn) => this.renderNode(sn, context, errors))
          );
          childrenHtml += `<div data-slot="${key}">${slotHtml.join("")}</div>`;
        }
      }

      return `<div data-block="${node.blockId}"${idAttr}${attrs}>${childrenHtml}</div>`;
    } catch (err) {
      errors.push(err as Error);
      return `<div style="color: red;">Error rendering node ${node.blockId}</div>`;
    }
  }
}
