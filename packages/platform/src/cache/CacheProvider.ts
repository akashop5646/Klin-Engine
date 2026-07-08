export interface CacheProvider {
  get(key: string): Promise<any>;
  set(key: string, value: any, ttlSec?: number): Promise<void>;
  delete(key: string): Promise<void>;
}
