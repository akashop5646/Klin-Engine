export class DependencyGraph {
  private adjList = new Map<string, Set<string>>();

  addNode(node: string) {
    if (!this.adjList.has(node)) {
      this.adjList.set(node, new Set());
    }
  }

  addEdge(from: string, to: string) {
    this.addNode(from);
    this.addNode(to);
    this.adjList.get(from)!.add(to);
  }

  hasCircularReference(): boolean {
    const visited = new Set<string>();
    const recStack = new Set<string>();

    const checkCycle = (node: string): boolean => {
      visited.add(node);
      recStack.add(node);

      const neighbors = this.adjList.get(node);
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            if (checkCycle(neighbor)) return true;
          } else if (recStack.has(neighbor)) {
            return true;
          }
        }
      }

      recStack.delete(node);
      return false;
    };

    for (const node of this.adjList.keys()) {
      if (!visited.has(node)) {
        if (checkCycle(node)) return true;
      }
    }

    return false;
  }

  sortTopologically(): string[] {
    const visited = new Set<string>();
    const stack: string[] = [];

    const sortNode = (node: string) => {
      visited.add(node);
      const neighbors = this.adjList.get(node);
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            sortNode(neighbor);
          }
        }
      }
      stack.push(node);
    };

    for (const node of this.adjList.keys()) {
      if (!visited.has(node)) {
        sortNode(node);
      }
    }

    return stack.reverse();
  }
}
