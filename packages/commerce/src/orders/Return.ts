export class Return {
  public id: string;
  public orderId: string;
  public skusReturned: string[] = [];

  constructor(id: string, orderId: string) {
    this.id = id;
    this.orderId = orderId;
  }
}
