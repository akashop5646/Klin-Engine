import type { RenderTree, RenderNode } from "@klin/pages";
import type { StreamContext } from "./StreamContext";

export class StreamRenderer {
  streamHtml(tree: RenderTree, context: StreamContext): void {
    const htmlChunks = [
      "<!DOCTYPE html>",
      "<html>",
      "<head><title>Streaming Page</title></head>",
      "<body>",
      `<div id="root">`,
      // Simulating chunks layout
      ...tree.root.map((n: RenderNode) => `<section data-block-id="${n.blockId}"></section>`),
      "</div>",
      "</body>",
      "</html>",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < htmlChunks.length) {
        context.onChunk?.(htmlChunks[i]);
        i++;
      } else {
        clearInterval(interval);
        context.onComplete?.();
      }
    }, context.chunkSize || 5);
  }
}
