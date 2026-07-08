import type { RenderTree } from "@klin/pages";
import type { RenderResult } from "../contracts/RenderResult";

export interface InspectorReport {
  treeId: string;
  renderGraph: { nodesCount: number; depth: number };
  componentGraph: string[];
  assetGraph: string[];
  timingGraph: { totalDuration: number };
}

export class Inspector {
  generateReport(tree: RenderTree, result: RenderResult): InspectorReport {
    const componentIds = new Set<string>();
    let maxDepth = 0;

    const traverse = (nodes: any[], depth: number) => {
      maxDepth = Math.max(maxDepth, depth);
      for (const n of nodes) {
        componentIds.add(n.blockId);
        if (n.children) {
          traverse(n.children, depth + 1);
        }
        if (n.slots) {
          for (const slotNodes of Object.values(n.slots)) {
            traverse(slotNodes as any[], depth + 1);
          }
        }
      }
    };

    traverse(tree.root, 1);

    return {
      treeId: tree.pageId,
      renderGraph: {
        nodesCount: result.metadata.nodeCount,
        depth: maxDepth,
      },
      componentGraph: Array.from(componentIds),
      assetGraph: [], // Exposes asset resolution links
      timingGraph: {
        totalDuration: result.duration,
      },
    };
  }
}
