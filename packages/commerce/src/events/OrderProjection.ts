import { CommerceEvent } from "./CommerceEvents";

export class OrderProjection {
  public totalOrdersPlaced: number = 0;

  public onEvent(event: CommerceEvent): void {
    if (event.name === "order.created") {
      this.totalOrdersPlaced++;
    }
  }
}
