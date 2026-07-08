export interface NavigationNode {
  pageId: string;
  label: string;
  route: string;
  children?: NavigationNode[];
}

export class NavigationGraph {
  private rootNodes: NavigationNode[] = [];

  constructor(initialNodes: NavigationNode[] = []) {
    this.rootNodes = initialNodes;
  }

  getRootNodes(): NavigationNode[] {
    return this.rootNodes;
  }

  addNode(pageId: string, label: string, route: string, parentPageId?: string): boolean {
    const newNode: NavigationNode = { pageId, label, route };
    if (!parentPageId) {
      this.rootNodes.push(newNode);
      return true;
    }

    const parent = this.findNode(parentPageId, this.rootNodes);
    if (!parent) return false;
    
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(newNode);
    return true;
  }

  findNode(pageId: string, nodes: NavigationNode[] = this.rootNodes): NavigationNode | null {
    for (const node of nodes) {
      if (node.pageId === pageId) return node;
      if (node.children) {
        const found = this.findNode(pageId, node.children);
        if (found) return found;
      }
    }
    return null;
  }

  getBreadcrumbs(pageId: string): Array<{ label: string; route: string }> {
    const path: Array<{ label: string; route: string }> = [];
    this.findBreadcrumbPath(pageId, this.rootNodes, path);
    return path;
  }

  private findBreadcrumbPath(
    pageId: string,
    nodes: NavigationNode[],
    path: Array<{ label: string; route: string }>
  ): boolean {
    for (const node of nodes) {
      path.push({ label: node.label, route: node.route });
      if (node.pageId === pageId) {
        return true;
      }
      if (node.children) {
        if (this.findBreadcrumbPath(pageId, node.children, path)) {
          return true;
        }
      }
      path.pop();
    }
    return false;
  }
}
