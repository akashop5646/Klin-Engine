export class SubscriptionPlan {
  public id: string;
  public interval: "Monthly" | "Annual";
  public price: number;

  constructor(id: string, interval: "Monthly" | "Annual", price: number) {
    this.id = id;
    this.interval = interval;
    this.price = price;
  }
}
