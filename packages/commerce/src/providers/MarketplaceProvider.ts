export interface MarketplaceProvider {
  exportItems(items: any[]): Promise<boolean>;
}
