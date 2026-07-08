export class RecommendationEngine {
  public getRelatedProducts(productId: string): string[] {
    return [`related-to-${productId}`];
  }
}
