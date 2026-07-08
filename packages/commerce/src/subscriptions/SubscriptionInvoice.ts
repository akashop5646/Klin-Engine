export class SubscriptionInvoice {
  public id: string;
  public subscriptionId: string;
  public amount: number;

  constructor(id: string, subscriptionId: string, amount: number) {
    this.id = id;
    this.subscriptionId = subscriptionId;
    this.amount = amount;
  }
}
