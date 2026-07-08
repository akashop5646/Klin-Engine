export class PriceEngine {
  public calculateBasePrice(basePrice: number, quantity: number): number {
    if (quantity > 10) {
      return basePrice * 0.9; // Volume discount
    }
    return basePrice;
  }
}
