export interface LayerNode {
  id: string;
  name: string;
  children?: LayerNode[];
}

export class LayerTree {
  public buildTree(renderTree: any): LayerNode[] {
    // Renders visual layers mapped to layout blocks
    return [];
  }
}
