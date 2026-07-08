export class Transfer {
  public sku: string;
  public fromWarehouseId: string;
  public toWarehouseId: string;
  public quantity: number;

  constructor(sku: string, fromWarehouseId: string, toWarehouseId: string, quantity: number) {
    this.sku = sku;
    this.fromWarehouseId = fromWarehouseId;
    this.toWarehouseId = toWarehouseId;
    this.quantity = quantity;
  }
}
