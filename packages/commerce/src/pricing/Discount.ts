export class Discount {
  public id: string;
  public percentage: number;

  constructor(id: string, percentage: number) {
    this.id = id;
    this.percentage = percentage;
  }
}
