import { QueryResult } from "./QueryResult";

export class QueryCache {
  private _cache: Map<string, { result: QueryResult; expiresAt: number }> = new Map();
  private _ttlMs: number;

  constructor(ttlMs: number = 30000) {
    this._ttlMs = ttlMs;
  }

  public set(key: string, result: QueryResult): void {
    this._cache.set(key, {
      result,
      expiresAt: Date.now() + this._ttlMs,
    });
  }

  public get(key: string): QueryResult | null {
    const cached = this._cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.expiresAt) {
      this._cache.delete(key);
      return null;
    }

    return cached.result;
  }

  public invalidateAll(): void {
    this._cache.clear();
  }

  public invalidateCollection(collectionName: string): void {
    // Invalidate keys that mention this collection name
    for (const key of this._cache.keys()) {
      if (key.includes(collectionName)) {
        this._cache.delete(key);
      }
    }
  }
}
