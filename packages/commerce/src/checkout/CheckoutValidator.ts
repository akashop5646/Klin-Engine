export class CheckoutValidator {
  public validateItemsCount(items: any[]): boolean {
    return items.length > 0;
  }
}
