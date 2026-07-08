import { MarketplaceAdapter } from "./MarketplaceAdapter";

export class AmazonAdapter implements MarketplaceAdapter {
  public readonly channelName: string = "Amazon";

  public async syncCatalog(products: any[]): Promise<boolean> {
    console.log(`AmazonAdapter syncing products catalog...`);
    return true;
  }
}
