export class WorkspaceCache {
  private _cacheData: Map<string, any> = new Map();

  public get<T>(key: string): T | undefined {
    return this._cacheData.get(key);
  }

  public set(key: string, value: any): void {
    this._cacheData.set(key, value);
  }

  public clear(): void {
    this._cacheData.clear();
  }
}
