export class CreditMemo {
  public id: string;
  public orderId: string;
  public amount: number;

  constructor(id: string, orderId: string, amount: number) {
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
  }
}
