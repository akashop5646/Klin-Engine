export class Inventory {
  public sku: string;
  public totalStock: number;

  constructor(sku: string, totalStock: number) {
    this.sku = sku;
    this.totalStock = totalStock;
  }
}
