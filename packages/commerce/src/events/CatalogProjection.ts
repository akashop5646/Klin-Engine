import { CommerceEvent } from "./CommerceEvents";

export class CatalogProjection {
  public totalProducts: number = 0;

  public onEvent(event: CommerceEvent): void {
    if (event.name === "catalog.product_added") {
      this.totalProducts++;
    }
  }
}
