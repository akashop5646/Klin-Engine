export class Reservation {
  public id: string;
  public sku: string;
  public quantity: number;
  public expiresAt: number;

  constructor(id: string, sku: string, quantity: number, expiresAt: number) {
    this.id = id;
    this.sku = sku;
    this.quantity = quantity;
    this.expiresAt = expiresAt;
  }
}
