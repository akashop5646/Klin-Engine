export interface PageTreeNode {
  id: string;
  type: "website" | "page" | "template" | "block" | "component";
  label: string;
  children?: PageTreeNode[];
}

export class PageTree {
  private root: PageTreeNode;

  constructor(root: PageTreeNode) {
    this.root = root;
  }

  getRoot(): PageTreeNode {
    return this.root;
  }

  findNode(id: string, node: PageTreeNode = this.root): PageTreeNode | null {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = this.findNode(id, child);
        if (found) return found;
      }
    }
    return null;
  }

  traverse(callback: (node: PageTreeNode) => void, node: PageTreeNode = this.root) {
    callback(node);
    if (node.children) {
      for (const child of node.children) {
        this.traverse(callback, child);
      }
    }
  }
}
