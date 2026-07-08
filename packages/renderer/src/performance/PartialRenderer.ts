export class PartialRenderer {
  public renderPartialBlock(blockId: string, updatedData: any): string {
    console.log(`Partial re-rendering block [${blockId}] due to CMS reactive update`);
    return `Block ${blockId} partially updated`;
  }
}
