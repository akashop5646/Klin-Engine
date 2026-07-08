import { CacheProvider } from "./CacheProvider";

export class PlatformCache {
  private _provider: CacheProvider;

  constructor(provider: CacheProvider) {
    this._provider = provider;
  }

  public async get(key: string): Promise<any> {
    return await this._provider.get(key);
  }

  public async set(key: string, value: any, ttlSec?: number): Promise<void> {
    await this._provider.set(key, value, ttlSec);
  }

  public async delete(key: string): Promise<void> {
    await this._provider.delete(key);
  }
}
