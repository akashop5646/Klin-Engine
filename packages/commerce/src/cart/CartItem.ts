export class CartItem {
  public sku: string;
  public quantity: number;
  public unitPrice: number;

  constructor(sku: string, quantity: number, unitPrice: number) {
    this.sku = sku;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}
