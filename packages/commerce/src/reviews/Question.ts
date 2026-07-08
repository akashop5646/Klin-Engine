export class Question {
  public id: string;
  public productId: string;
  public queryText: string;

  constructor(id: string, productId: string, queryText: string) {
    this.id = id;
    this.productId = productId;
    this.queryText = queryText;
  }
}
