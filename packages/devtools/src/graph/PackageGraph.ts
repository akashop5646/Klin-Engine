import { DependencyGraph } from "./DependencyGraph";

export class PackageGraph extends DependencyGraph {
  public registerPackage(packageName: string, dependencies: string[]): void {
    this.addNode(packageName, dependencies);
  }
}
