import type { IRenderer } from "../core/IRenderer";
import type { RenderTree } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";
import type { RenderResult } from "../contracts/RenderResult";

export class PDFRenderer implements IRenderer {
  readonly id = "PDF";

  supports(target: string): boolean {
    return target.toLowerCase() === "pdf";
  }

  async render(tree: RenderTree, context: RendererContext): Promise<RenderResult> {
    const startTime = Date.now();
    const errors: Error[] = [];
    const warnings: string[] = [];

    // PDF formats use printable layouts context
    const bodyHtml = await Promise.all(
      tree.root.map((node) => this.renderNode(node, context, errors))
    );

    const pdfHtml = `<html>
<head>
  <style>
    @media print {
      body { font-size: 12pt; line-height: 1.5; color: #000; }
      .page-break { page-break-after: always; }
    }
  </style>
</head>
<body>
  ${bodyHtml.join('\n  <div class="page-break"></div>\n  ')}
</body>
</html>`;

    return {
      success: errors.length === 0,
      duration: Date.now() - startTime,
      warnings,
      errors,
      output: pdfHtml,
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
      let content = "";
      if (node.props.text) {
        content += `<p>${node.props.text}</p>`;
      }
      if (node.children) {
        const sub = await Promise.all(
          node.children.map((c: any) => this.renderNode(c, context, errors))
        );
        content += sub.join("");
      }
      return `<div class="pdf-section">${content}</div>`;
    } catch (err) {
      errors.push(err as Error);
      return `<div>Error</div>`;
    }
  }
}
