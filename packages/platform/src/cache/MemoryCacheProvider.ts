import { CacheProvider } from "./CacheProvider";

export class MemoryCacheProvider implements CacheProvider {
  private _store: Map<string, any> = new Map();

  public async get(key: string): Promise<any> {
    return this._store.get(key);
  }

  public async set(key: string, value: any, ttlSec?: number): Promise<void> {
    this._store.set(key, value);
  }

  public async delete(key: string): Promise<void> {
    this._store.delete(key);
  }
}
