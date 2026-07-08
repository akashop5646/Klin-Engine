import { DependencyGraph } from "./DependencyGraph";

export interface BuildPlan {
  batches: string[][]; // Groups of nodes that can be built in parallel
}

export class BuildPlanner {
  public plan(graph: DependencyGraph): BuildPlan {
    const inDegree: Record<string, number> = {};
    const adjList: Record<string, string[]> = {};

    // Initialize
    for (const node of graph.getNodes()) {
      inDegree[node.id] = 0;
      adjList[node.id] = [];
    }

    // Populate
    for (const node of graph.getNodes()) {
      for (const dep of node.dependencies) {
        if (inDegree[node.id] !== undefined) {
          inDegree[node.id]++;
        }
        if (adjList[dep]) {
          adjList[dep].push(node.id);
        }
      }
    }

    const batches: string[][] = [];
    let queue: string[] = [];

    // Roots (0 dependencies)
    for (const node of graph.getNodes()) {
      if (inDegree[node.id] === 0) {
        queue.push(node.id);
      }
    }

    while (queue.length > 0) {
      batches.push([...queue]);
      const nextQueue: string[] = [];

      for (const u of queue) {
        const neighbors = adjList[u] || [];
        for (const v of neighbors) {
          inDegree[v]--;
          if (inDegree[v] === 0) {
            nextQueue.push(v);
          }
        }
      }
      queue = nextQueue;
    }

    return { batches };
  }
}
