export class Refund {
  public id: string;
  public orderId: string;
  public amountRefunded: number;

  constructor(id: string, orderId: string, amountRefunded: number) {
    this.id = id;
    this.orderId = orderId;
    this.amountRefunded = amountRefunded;
  }
}
