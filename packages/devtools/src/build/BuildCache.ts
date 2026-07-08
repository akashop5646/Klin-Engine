export class BuildCache {
  private _cachedFiles: Map<string, string> = new Map();

  public get(filePath: string): string | undefined {
    return this._cachedFiles.get(filePath);
  }

  public set(filePath: string, contentHash: string): void {
    this._cachedFiles.set(filePath, contentHash);
  }
}
