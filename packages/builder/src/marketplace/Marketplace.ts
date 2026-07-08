import { MarketplaceItem } from "./MarketplaceItem";

export class Marketplace {
  private _items: MarketplaceItem[] = [];

  constructor() {
    this.registerDefaults();
  }

  public register(item: MarketplaceItem): void {
    this._items.push(item);
  }

  public getItems(): MarketplaceItem[] {
    return this._items;
  }

  private registerDefaults(): void {
    this.register(new MarketplaceItem("banner-cta", "Announce CTA Block", "Block", "https://cdn.klin.dev/marketplace/banner.json"));
    this.register(new MarketplaceItem("shopify-sync", "Shopify Sync Plugin", "Plugin", "https://cdn.klin.dev/marketplace/shopify.json"));
  }
}
