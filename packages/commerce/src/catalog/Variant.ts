export class Variant {
  public id: string;
  public sku: string;
  public price: number;
  public options: Map<string, string> = new Map();

  constructor(id: string, sku: string, price: number) {
    this.id = id;
    this.sku = sku;
    this.price = price;
  }
}
