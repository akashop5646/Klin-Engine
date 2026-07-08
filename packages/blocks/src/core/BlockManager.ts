import { BlockManifest } from "../contracts/BlockManifest";
import { BlockInstance, BlockFactory } from "./BlockFactory";
import { BlockContext } from "./BlockContext";
import { Result, Ok, Err } from "@klin/core";

export class BlockManager {
  private context: BlockContext;
  private factory: BlockFactory;
  private registeredBlocks: Map<string, BlockManifest> = new Map();
  private instances: Map<string, BlockInstance> = new Map();

  constructor(context: BlockContext) {
    this.context = context;
    this.factory = new BlockFactory(context);
  }

  register(manifest: BlockManifest): Result<void, Error> {
    this.registeredBlocks.set(manifest.id, manifest);
    return new Ok(undefined);
  }

  unregister(id: string) {
    this.registeredBlocks.delete(id);
  }

  async instantiate(id: string, initialProps: Record<string, any> = {}): Promise<Result<BlockInstance, Error>> {
    const manifest = this.registeredBlocks.get(id);
    if (!manifest) {
      return new Err(new Error(`Block not registered: ${id}`));
    }
    const res = await this.factory.createBlock(manifest, initialProps);
    if (res.ok) {
      this.instances.set(id, res.value);
    }
    return res;
  }

  destroy(id: string) {
    const instance = this.instances.get(id);
    if (instance) {
      instance.lifecycle.dispose();
      this.instances.delete(id);
      this.context.eventBus.getPublisher().publish("block.deleted", { blockId: id }, "blocks");
    }
  }

  list(): BlockManifest[] {
    return Array.from(this.registeredBlocks.values());
  }
}
