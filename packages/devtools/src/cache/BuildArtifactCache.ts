export class BuildArtifactCache {
  private _artifacts: Map<string, ArrayBuffer> = new Map();

  public get(filePath: string): ArrayBuffer | undefined {
    return this._artifacts.get(filePath);
  }

  public set(filePath: string, buffer: ArrayBuffer): void {
    this._artifacts.set(filePath, buffer);
  }
}
