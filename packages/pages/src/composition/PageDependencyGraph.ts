export interface DependencyGraphNode {
  id: string;
  type: "template" | "block" | "component" | "theme" | "asset";
  label: string;
  dependencies?: string[];
}

export class PageDependencyGraph {
  private nodes: Map<string, DependencyGraphNode> = new Map();

  addNode(id: string, type: DependencyGraphNode["type"], label: string, dependencies: string[] = []) {
    this.nodes.set(id, { id, type, label, dependencies });
  }

  getNode(id: string): DependencyGraphNode | undefined {
    return this.nodes.get(id);
  }

  getNodes(): DependencyGraphNode[] {
    return Array.from(this.nodes.values());
  }

  getDirectDependencies(id: string): string[] {
    const node = this.nodes.get(id);
    return node?.dependencies ?? [];
  }

  getTransitiveDependencies(id: string, visited: Set<string> = new Set()): string[] {
    if (visited.has(id)) return [];
    visited.add(id);

    const direct = this.getDirectDependencies(id);
    const transitive: string[] = [...direct];

    for (const depId of direct) {
      transitive.push(...this.getTransitiveDependencies(depId, visited));
    }

    return Array.from(new Set(transitive));
  }
}
