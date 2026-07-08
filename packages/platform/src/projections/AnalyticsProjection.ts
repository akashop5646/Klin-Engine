import { PlatformProjection } from "../events/PlatformProjection";

export class AnalyticsProjection extends PlatformProjection {
  public readonly name: string = "Analytics";
  public totalVisits: number = 0;

  public handleEvent(event: any): void {
    if (event.type === "visit.logged") {
      this.totalVisits += event.payload.count || 1;
    }
  }
}
