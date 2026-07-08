export class ShipmentManager {
  public async createShipmentRecord(orderId: string, address: any): Promise<string> {
    const trackingNumber = "TRK" + Math.floor(Math.random() * 900000 + 100000);
    console.log(`ShipmentManager created shipment record for Order: ${orderId} Tracking: ${trackingNumber}`);
    return trackingNumber;
  }
}
