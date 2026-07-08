export class RecommendationAI {
  public predictSimilarSkus(sku: string): string[] {
    return [`ai-sim-${sku}`];
  }
}
