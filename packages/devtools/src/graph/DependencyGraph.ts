export interface DependencyNode {
  id: string;
  dependencies: string[];
}

export class DependencyGraph {
  private _nodes: Map<string, DependencyNode> = new Map();

  public addNode(id: string, dependencies: string[] = []): void {
    this._nodes.set(id, { id, dependencies });
  }

  public getNode(id: string): DependencyNode | undefined {
    return this._nodes.get(id);
  }

  public getNodes(): DependencyNode[] {
    return Array.from(this._nodes.values());
  }

  public hasNode(id: string): boolean {
    return this._nodes.has(id);
  }
}
