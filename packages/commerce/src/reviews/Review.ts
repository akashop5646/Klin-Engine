export class Review {
  public id: string;
  public productId: string;
  public customerId: string;
  public rating: number;
  public comment: string;

  constructor(id: string, productId: string, customerId: string, rating: number, comment: string) {
    this.id = id;
    this.productId = productId;
    this.customerId = customerId;
    this.rating = rating;
    this.comment = comment;
  }
}
