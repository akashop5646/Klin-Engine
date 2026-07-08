import { CacheProvider } from "./CacheProvider";

export class DistributedCacheProvider implements CacheProvider {
  private _distMock: Map<string, any> = new Map();

  public async get(key: string): Promise<any> {
    console.log(`Distributed query: ${key}`);
    return this._distMock.get(key);
  }

  public async set(key: string, value: any, ttlSec?: number): Promise<void> {
    this._distMock.set(key, value);
  }

  public async delete(key: string): Promise<void> {
    this._distMock.delete(key);
  }
}
