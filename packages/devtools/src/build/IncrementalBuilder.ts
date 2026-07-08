import { BuildCache } from "./BuildCache";

export class IncrementalBuilder {
  private _cache: BuildCache;

  constructor(cache: BuildCache) {
    this._cache = cache;
  }

  public shouldRebuild(filePath: string, currentHash: string): boolean {
    const prevHash = this._cache.get(filePath);
    if (prevHash === currentHash) {
      return false;
    }
    this._cache.set(filePath, currentHash);
    return true;
  }
}
