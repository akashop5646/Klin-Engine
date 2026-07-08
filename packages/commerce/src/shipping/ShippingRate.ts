export class ShippingRate {
  public methodId: string;
  public cost: number;

  constructor(methodId: string, cost: number) {
    this.methodId = methodId;
    this.cost = cost;
  }
}
