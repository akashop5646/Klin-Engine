export class ShippingMethod {
  public id: string;
  public name: string;
  public baseCost: number;

  constructor(id: string, name: string, baseCost: number) {
    this.id = id;
    this.name = name;
    this.baseCost = baseCost;
  }
}
