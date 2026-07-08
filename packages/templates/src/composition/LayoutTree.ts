export interface LayoutNode {
  id: string;
  blockId: string;
  properties: Record<string, any>;
  children?: LayoutNode[];
}

export class LayoutTree {
  private root: LayoutNode[];

  constructor(root: LayoutNode[]) {
    this.root = root;
  }

  getRoot(): LayoutNode[] {
    return this.root;
  }

  findNode(id: string, nodes: LayoutNode[] = this.root): LayoutNode | null {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = this.findNode(id, node.children);
        if (found) return found;
      }
    }
    return null;
  }

  traverse(callback: (node: LayoutNode) => void, nodes: LayoutNode[] = this.root) {
    for (const node of nodes) {
      callback(node);
      if (node.children) {
        this.traverse(callback, node.children);
      }
    }
  }
}
