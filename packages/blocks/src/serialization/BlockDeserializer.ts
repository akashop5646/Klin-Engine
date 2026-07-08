import { BlockInstance, BlockFactory } from "../core/BlockFactory";
import { BlockManifest } from "../contracts/BlockManifest";
import { Result, Ok, Err } from "@klin/core";

export class BlockDeserializer {
  private factory: BlockFactory;

  constructor(factory: BlockFactory) {
    this.factory = factory;
  }

  async deserialize(
    serialized: string,
    resolvedManifest: BlockManifest
  ): Promise<Result<BlockInstance, Error>> {
    try {
      const parsed = JSON.parse(serialized);
      const res = await this.factory.createBlock(resolvedManifest, parsed.properties || {});
      return res;
    } catch (err: any) {
      return new Err(err);
    }
  }
}
