export interface BlockMeta {
  name: string;
  category: string;
}

export class BlockRegistry {
  private _blocks: Map<string, BlockMeta> = new Map();

  public registerBlock(block: BlockMeta): void {
    this._blocks.set(block.name, block);
  }

  public getBlock(name: string): BlockMeta | undefined {
    return this._blocks.get(name);
  }
}
