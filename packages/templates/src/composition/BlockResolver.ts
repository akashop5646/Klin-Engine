import { Registry } from "@klin/registry";
import { Result, Ok, Err } from "@klin/core";

export class BlockResolver {
  private registry: Registry;

  constructor(registry: Registry) {
    this.registry = registry;
  }

  async resolveBlock(id: string): Promise<Result<any, Error>> {
    // Blocks are resolved dynamically through Registry
    const resolved = await this.registry.resolve("block", id);
    if (!resolved) {
      // Direct cast fallback validation lookup
      const list = (this.registry as any).engine?.catalogs?.blocks?.list();
      const fallback = list?.find((item: any) => item.metadata?.id === id || item.id === id);
      if (fallback) {
        return new Ok(fallback);
      }
      return new Err(new Error(`Missing dependency block: ${id}`));
    }
    return new Ok(resolved);
  }

  async validateBlocks(blockIds: string[]): Promise<Result<void, Error>> {
    for (const id of blockIds) {
      const res = await this.resolveBlock(id);
      if (!res.ok) {
        return new Err(new Error(`Unresolved block dependency: ${id}`));
      }
    }
    return new Ok(undefined);
  }
}
