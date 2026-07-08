export class StockItem {
  public sku: string;
  public warehouseId: string;
  public quantityOnHand: number;
  public quantityReserved: number;

  constructor(sku: string, warehouseId: string, quantityOnHand: number) {
    this.sku = sku;
    this.warehouseId = warehouseId;
    this.quantityOnHand = quantityOnHand;
    this.quantityReserved = 0;
  }
}
