import { BlockMeta } from "./BlockLibrary";

export class BlockSearch {
  public search(query: string, blocks: BlockMeta[]): BlockMeta[] {
    const term = query.toLowerCase().trim();
    if (!term) return blocks;
    return blocks.filter((b) => b.label.toLowerCase().includes(term) || b.type.toLowerCase().includes(term));
  }
}
