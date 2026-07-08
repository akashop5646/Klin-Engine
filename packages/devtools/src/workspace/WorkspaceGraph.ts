import { DependencyGraph } from "../graph/DependencyGraph";

export class WorkspaceGraph extends DependencyGraph {
  public buildWorkspaceTree(): void {
    console.log("WorkspaceGraph building tree mappings representation index...");
  }
}
