export class PriceCalculator {
  public calculateTotal(subtotal: number, discount: number, shipping: number, tax: number): number {
    return subtotal - discount + shipping + tax;
  }
}
