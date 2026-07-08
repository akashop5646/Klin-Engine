import { DependencyGraph } from "./DependencyGraph";

export class ImpactAnalyzer {
  public analyze(graph: DependencyGraph, changedFiles: string[]): string[] {
    const affected = new Set<string>();
    const dependentsMap: Record<string, string[]> = {};

    // Build reverse dependencies map
    for (const node of graph.getNodes()) {
      for (const dep of node.dependencies) {
        if (!dependentsMap[dep]) {
          dependentsMap[dep] = [];
        }
        dependentsMap[dep].push(node.id);
      }
    }

    const traverse = (fileId: string) => {
      if (affected.has(fileId)) return;
      affected.add(fileId);
      const dependents = dependentsMap[fileId] || [];
      for (const dep of dependents) {
        traverse(dep);
      }
    };

    for (const file of changedFiles) {
      traverse(file);
    }

    return Array.from(affected);
  }
}
