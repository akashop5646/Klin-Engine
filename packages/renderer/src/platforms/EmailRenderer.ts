import type { IRenderer } from "../core/IRenderer";
import type { RenderTree } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";
import type { RenderResult } from "../contracts/RenderResult";

export class EmailRenderer implements IRenderer {
  readonly id = "Email";

  supports(target: string): boolean {
    return target.toLowerCase() === "email";
  }

  async render(tree: RenderTree, context: RendererContext): Promise<RenderResult> {
    const startTime = Date.now();
    const errors: Error[] = [];
    const warnings: string[] = [];

    const bodyHtml = await Promise.all(
      tree.root.map((node) => this.renderNode(node, context, errors))
    );

    // Encapsulate with table layout for email clients
    const emailHtml = `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
  <tr>
    <td align="center">
      <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 1px solid #dddddd; padding: 20px; border-radius: 4px;">
        <tr>
          <td>
            ${bodyHtml.join("\n            ")}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

    return {
      success: errors.length === 0,
      duration: Date.now() - startTime,
      warnings,
      errors,
      output: emailHtml,
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
      // Basic inline style mapping for email tags compatibility
      let inlineStyle = "padding: 10px; margin-bottom: 10px;";
      if (node.props.style) {
        for (const [key, val] of Object.entries(node.props.style)) {
          inlineStyle += ` ${key}: ${val};`;
        }
      }

      let childrenHtml = "";
      if (node.children) {
        const sub = await Promise.all(
          node.children.map((c: any) => this.renderNode(c, context, errors))
        );
        childrenHtml += sub.join("");
      }

      return `<div style="${inlineStyle}">${childrenHtml}</div>`;
    } catch (err) {
      errors.push(err as Error);
      return `<div style="color: red;">Error: ${node.blockId}</div>`;
    }
  }
}
