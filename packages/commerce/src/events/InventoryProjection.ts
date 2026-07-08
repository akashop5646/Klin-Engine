import { CommerceEvent } from "./CommerceEvents";

export class InventoryProjection {
  public stockAdjustmentsCount: number = 0;

  public onEvent(event: CommerceEvent): void {
    if (event.name === "inventory.updated") {
      this.stockAdjustmentsCount++;
    }
  }
}
