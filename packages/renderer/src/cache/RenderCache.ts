export type CacheScope = "Request" | "Memory" | "Distributed" | "Persistent";

export interface RenderCacheProvider {
  get(key: string, scope: CacheScope): any | undefined;
  set(key: string, value: any, scope: CacheScope): void;
  delete(key: string, scope: CacheScope): void;
  clear(scope: CacheScope): void;
}

export class MemoryCacheProvider implements RenderCacheProvider {
  private _scopes: Record<CacheScope, Map<string, any>> = {
    Request: new Map(),
    Memory: new Map(),
    Distributed: new Map(),
    Persistent: new Map(),
  };

  public get(key: string, scope: CacheScope): any | undefined {
    return this._scopes[scope].get(key);
  }

  public set(key: string, value: any, scope: CacheScope): void {
    this._scopes[scope].set(key, value);
  }

  public delete(key: string, scope: CacheScope): void {
    this._scopes[scope].delete(key);
  }

  public clear(scope: CacheScope): void {
    this._scopes[scope].clear();
  }
}

export class RenderCache {
  private _provider: RenderCacheProvider;

  constructor(provider: RenderCacheProvider = new MemoryCacheProvider()) {
    this._provider = provider;
  }

  public get(key: string, scope: CacheScope = "Memory"): any | undefined {
    return this._provider.get(key, scope);
  }

  public set(key: string, value: any, scope: CacheScope = "Memory"): void {
    this._provider.set(key, value, scope);
  }

  public invalidate(key: string): void {
    this._provider.delete(key, "Request");
    this._provider.delete(key, "Memory");
    this._provider.delete(key, "Distributed");
    this._provider.delete(key, "Persistent");
  }

  public clear(): void {
    this._provider.clear("Request");
    this._provider.clear("Memory");
    this._provider.clear("Distributed");
    this._provider.clear("Persistent");
  }
}
