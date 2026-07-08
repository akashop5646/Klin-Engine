export class ResourceGraph {
  private _dependencies: Map<string, string[]> = new Map();

  public addDependency(childId: string, parentId: string): void {
    if (!this._dependencies.has(childId)) {
      this._dependencies.set(childId, []);
    }
    this._dependencies.get(childId)!.push(parentId);
  }

  public getDependencies(childId: string): string[] {
    return this._dependencies.get(childId) || [];
  }
}
