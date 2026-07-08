import { MarketplaceAdapter } from "./MarketplaceAdapter";

export class eBayAdapter implements MarketplaceAdapter {
  public readonly channelName: string = "eBay";

  public async syncCatalog(products: any[]): Promise<boolean> {
    console.log(`eBayAdapter syncing products catalog...`);
    return true;
  }
}
