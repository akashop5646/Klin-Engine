import { MarketplaceAdapter } from "./MarketplaceAdapter";

export class FlipkartAdapter implements MarketplaceAdapter {
  public readonly channelName: string = "Flipkart";

  public async syncCatalog(products: any[]): Promise<boolean> {
    console.log(`FlipkartAdapter syncing products catalog...`);
    return true;
  }
}
