import { DependencyGraph } from "./DependencyGraph";

export class CircularDependencyDetector {
  public detect(graph: DependencyGraph): string[][] {
    const visited: Record<string, boolean> = {};
    const stack: Record<string, boolean> = {};
    const cycles: string[][] = [];

    const dfs = (nodeId: string, path: string[]) => {
      visited[nodeId] = true;
      stack[nodeId] = true;
      path.push(nodeId);

      const node = graph.getNode(nodeId);
      if (node) {
        for (const depId of node.dependencies) {
          if (!visited[depId]) {
            dfs(depId, [...path]);
          } else if (stack[depId]) {
            const cycleStartIdx = path.indexOf(depId);
            if (cycleStartIdx !== -1) {
              cycles.push([...path.slice(cycleStartIdx), depId]);
            }
          }
        }
      }

      stack[nodeId] = false;
    };

    for (const node of graph.getNodes()) {
      if (!visited[node.id]) {
        dfs(node.id, []);
      }
    }

    return cycles;
  }
}
