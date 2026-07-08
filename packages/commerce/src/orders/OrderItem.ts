export class OrderItem {
  public sku: string;
  public quantity: number;
  public price: number;

  constructor(sku: string, quantity: number, price: number) {
    this.sku = sku;
    this.quantity = quantity;
    this.price = price;
  }
}
