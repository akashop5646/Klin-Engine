export class Wishlist {
  public id: string;
  public customerId: string;
  public skus: string[] = [];

  constructor(id: string, customerId: string) {
    this.id = id;
    this.customerId = customerId;
  }
}
