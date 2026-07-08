import { DependencyGraph } from "./DependencyGraph";

export class ModuleGraph extends DependencyGraph {
  public registerModule(modulePath: string, importedPaths: string[]): void {
    this.addNode(modulePath, importedPaths);
  }
}
