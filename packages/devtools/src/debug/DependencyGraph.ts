import { DependencyGraph as CoreDependencyGraph } from "../graph/DependencyGraph";

export class DebugDependencyGraph {
  public visualize(graph: CoreDependencyGraph): string {
    const lines: string[] = ["[Dependency Graph Debug View]"];
    for (const node of graph.getNodes()) {
      const deps = node.dependencies.length > 0 ? node.dependencies.join(", ") : "(none)";
      lines.push(`  ${node.id} → [${deps}]`);
    }
    return lines.join("\n");
  }
}
