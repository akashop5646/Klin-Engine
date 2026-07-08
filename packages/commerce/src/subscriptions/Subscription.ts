export class Subscription {
  public id: string;
  public planId: string;
  public status: "Active" | "PastDue" | "Canceled" = "Active";

  constructor(id: string, planId: string) {
    this.id = id;
    this.planId = planId;
  }
}
