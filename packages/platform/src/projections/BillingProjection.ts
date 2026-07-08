import { PlatformProjection } from "../events/PlatformProjection";

export class BillingProjection extends PlatformProjection {
  public readonly name: string = "Billing";
  public totalBilledCents: number = 0;

  public handleEvent(event: any): void {
    if (event.type === "invoice.paid") {
      this.totalBilledCents += event.payload.amount || 0;
    }
  }
}
