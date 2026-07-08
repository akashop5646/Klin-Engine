export class AIArtifacts {
  private _artifacts: Map<string, string> = new Map();

  public addArtifactReference(name: string, path: string): void {
    this._artifacts.set(name, path);
  }

  public getArtifactPath(name: string): string | undefined {
    return this._artifacts.get(name);
  }
}
