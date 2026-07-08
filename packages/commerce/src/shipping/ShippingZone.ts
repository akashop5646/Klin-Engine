export class ShippingZone {
  public id: string;
  public countries: string[] = [];

  constructor(id: string) {
    this.id = id;
  }
}
