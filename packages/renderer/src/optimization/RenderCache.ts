import type { RenderResult } from "../contracts/RenderResult";

export class RenderCache {
  private cache: Map<string, { result: RenderResult; timestamp: number }> = new Map();

  get(hash: string): RenderResult | undefined {
    return this.cache.get(hash)?.result;
  }

  set(hash: string, result: RenderResult): void {
    this.cache.set(hash, {
      result: {
        ...result,
        metadata: {
          ...result.metadata,
          cached: true,
          hash,
        },
      },
      timestamp: Date.now(),
    });
  }

  delete(hash: string): void {
    this.cache.delete(hash);
  }

  clear(): void {
    this.cache.clear();
  }
}
