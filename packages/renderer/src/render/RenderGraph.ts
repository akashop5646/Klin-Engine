export class RenderGraph {
  private _blockToDeps: Map<string, Set<string>> = new Map(); // blockId -> dependencies
  private _depToBlocks: Map<string, Set<string>> = new Map(); // dependency -> blockIds

  public addDependency(blockId: string, dependencyKey: string): void {
    // Forward mapping
    if (!this._blockToDeps.has(blockId)) {
      this._blockToDeps.set(blockId, new Set());
    }
    this._blockToDeps.get(blockId)!.add(dependencyKey);

    // Bidirectional reverse mapping
    if (!this._depToBlocks.has(dependencyKey)) {
      this._depToBlocks.set(dependencyKey, new Set());
    }
    this._depToBlocks.get(dependencyKey)!.add(blockId);
  }

  public getDependencies(blockId: string): string[] {
    const set = this._blockToDeps.get(blockId);
    return set ? Array.from(set) : [];
  }

  public getDependents(dependencyKey: string): string[] {
    const set = this._depToBlocks.get(dependencyKey);
    return set ? Array.from(set) : [];
  }

  public removeBlock(blockId: string): void {
    const deps = this._blockToDeps.get(blockId);
    if (deps) {
      for (const dep of deps) {
        this._depToBlocks.get(dep)?.delete(blockId);
      }
      this._blockToDeps.delete(blockId);
    }
  }
}
