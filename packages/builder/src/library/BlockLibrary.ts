export interface BlockMeta {
  type: string;
  label: string;
  category: string;
}

export class BlockLibrary {
  private _blocks: BlockMeta[] = [];

  public registerBlock(meta: BlockMeta): void {
    this._blocks.push(meta);
  }

  public getBlocks(): BlockMeta[] {
    return this._blocks;
  }
}
