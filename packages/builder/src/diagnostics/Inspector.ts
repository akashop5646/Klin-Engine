export class Inspector {
  public debugLayoutTree(tree: any): string {
    return JSON.stringify(tree, null, 2);
  }
}
