export interface MarketplaceAdapter {
  readonly channelName: string;
  syncCatalog(products: any[]): Promise<boolean>;
}
