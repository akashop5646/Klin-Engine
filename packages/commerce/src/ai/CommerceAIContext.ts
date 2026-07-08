export class CommerceAIContext {
  public recentPurchasedSkus: string[] = [];
  public currentLocale: string = "en";

  public addPurchasedSku(sku: string): void {
    this.recentPurchasedSkus.push(sku);
  }
}
