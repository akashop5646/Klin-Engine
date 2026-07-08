export class TreeRenderer {
  public renderTree(nodes: any[]): string {
    return nodes.map(() => "Node").join(",");
  }
}
