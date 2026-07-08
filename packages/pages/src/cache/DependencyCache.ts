import type { ResolvedDependencies } from "../composition/PageDependencyResolver";

export class DependencyCache {
  private cache: Map<string, { dependencies: ResolvedDependencies; timestamp: number }> = new Map();

  get(pageId: string, version: string): ResolvedDependencies | undefined {
    const key = `${pageId}:${version}`;
    return this.cache.get(key)?.dependencies;
  }

  set(pageId: string, version: string, dependencies: ResolvedDependencies): void {
    const key = `${pageId}:${version}`;
    this.cache.set(key, { dependencies, timestamp: Date.now() });
  }

  delete(pageId: string, version: string): void {
    const key = `${pageId}:${version}`;
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
