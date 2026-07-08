export interface CompositionNode {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: CompositionNode[];
}

export class CompositionTree {
  private root: CompositionNode;

  constructor(root: CompositionNode) {
    this.root = root;
  }

  getRoot(): CompositionNode {
    return this.root;
  }

  findNode(id: string, current: CompositionNode = this.root): CompositionNode | null {
    if (current.id === id) return current;
    if (current.children) {
      for (const child of current.children) {
        const found = this.findNode(id, child);
        if (found) return found;
      }
    }
    return null;
  }

  traverse(callback: (node: CompositionNode) => void, current: CompositionNode = this.root) {
    callback(current);
    if (current.children) {
      for (const child of current.children) {
        this.traverse(callback, child);
      }
    }
  }
}
