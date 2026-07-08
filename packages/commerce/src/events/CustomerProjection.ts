import { CommerceEvent } from "./CommerceEvents";

export class CustomerProjection {
  public totalCustomersCount: number = 0;

  public onEvent(event: CommerceEvent): void {
    if (event.name === "customer.registered") {
      this.totalCustomersCount++;
    }
  }
}
