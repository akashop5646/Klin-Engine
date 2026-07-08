export class Tracking {
  public async getTrackingUpdates(trackingNumber: string): Promise<string[]> {
    return ["Shipped", "In Transit", "Out for Delivery"];
  }
}
