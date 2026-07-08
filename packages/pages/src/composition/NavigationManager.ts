import { NavigationGraph, NavigationNode } from "./NavigationGraph";

export class NavigationManager {
  private graph: NavigationGraph;

  constructor(graph?: NavigationGraph) {
    this.graph = graph ?? new NavigationGraph();
  }

  getGraph(): NavigationGraph {
    return this.graph;
  }

  registerPage(pageId: string, label: string, route: string, parentPageId?: string): boolean {
    return this.graph.addNode(pageId, label, route, parentPageId);
  }

  removePage(pageId: string): boolean {
    const rootNodes = this.graph.getRootNodes();
    return this.removeNodeById(pageId, rootNodes);
  }

  private removeNodeById(pageId: string, nodes: NavigationNode[]): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].pageId === pageId) {
        nodes.splice(i, 1);
        return true;
      }
      if (nodes[i].children) {
        if (this.removeNodeById(pageId, nodes[i].children!)) {
          return true;
        }
      }
    }
    return false;
  }
}
