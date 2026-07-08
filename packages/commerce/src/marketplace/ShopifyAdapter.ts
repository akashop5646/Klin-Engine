import { MarketplaceAdapter } from "./MarketplaceAdapter";

export class ShopifyAdapter implements MarketplaceAdapter {
  public readonly channelName: string = "Shopify";

  public async syncCatalog(products: any[]): Promise<boolean> {
    console.log(`ShopifyAdapter syncing products catalog...`);
    return true;
  }
}
