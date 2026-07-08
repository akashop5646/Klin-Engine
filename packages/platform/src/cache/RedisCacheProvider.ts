import { CacheProvider } from "./CacheProvider";

export class RedisCacheProvider implements CacheProvider {
  private _redisMock: Map<string, any> = new Map();

  public async get(key: string): Promise<any> {
    console.log(`Redis query: ${key}`);
    return this._redisMock.get(key);
  }

  public async set(key: string, value: any, ttlSec?: number): Promise<void> {
    this._redisMock.set(key, value);
  }

  public async delete(key: string): Promise<void> {
    this._redisMock.delete(key);
  }
}
