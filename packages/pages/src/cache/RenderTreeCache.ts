import type { RenderTree } from "../render-tree/RenderTree";

export class RenderTreeCache {
  private cache: Map<string, { tree: RenderTree; timestamp: number }> = new Map();

  get(pageId: string, version: string): RenderTree | undefined {
    const key = `${pageId}:${version}`;
    return this.cache.get(key)?.tree;
  }

  set(pageId: string, version: string, tree: RenderTree): void {
    const key = `${pageId}:${version}`;
    this.cache.set(key, { tree, timestamp: Date.now() });
  }

  delete(pageId: string, version: string): void {
    const key = `${pageId}:${version}`;
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
