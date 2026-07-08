export class Cancellation {
  public id: string;
  public orderId: string;
  public reason: string;

  constructor(id: string, orderId: string, reason: string) {
    this.id = id;
    this.orderId = orderId;
    this.reason = reason;
  }
}
