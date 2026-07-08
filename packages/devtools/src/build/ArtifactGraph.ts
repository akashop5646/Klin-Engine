export class ArtifactGraph {
  private _relations: Map<string, Set<string>> = new Map();

  public link(outputPath: string, sourcePath: string): void {
    if (!this._relations.has(outputPath)) {
      this._relations.set(outputPath, new Set());
    }
    this._relations.get(outputPath)!.add(sourcePath);
  }

  public getSources(outputPath: string): string[] {
    return Array.from(this._relations.get(outputPath) || []);
  }

  public unlink(outputPath: string): void {
    this._relations.delete(outputPath);
  }
}
