export class DeliveryEstimate {
  public estimateDays(zoneId: string): number {
    if (zoneId === "Domestic") return 3;
    return 7;
  }
}
