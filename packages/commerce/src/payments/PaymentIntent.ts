export class PaymentIntent {
  public id: string;
  public amount: number;
  public status: "Succeeded" | "Processing" | "Canceled" = "Processing";

  constructor(id: string, amount: number) {
    this.id = id;
    this.amount = amount;
  }
}
