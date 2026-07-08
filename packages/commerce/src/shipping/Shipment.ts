export class Shipment {
  public id: string;
  public orderId: string;
  public trackingNumber: string;

  constructor(id: string, orderId: string, trackingNumber: string) {
    this.id = id;
    this.orderId = orderId;
    this.trackingNumber = trackingNumber;
  }
}
