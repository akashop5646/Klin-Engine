export class CommerceContext {
  public websiteId: string;
  public customerId?: string;
  public currency: string = "USD";
  public locale: string = "en";
  public cartId?: string;
  public sessionId?: string;

  constructor(websiteId: string) {
    this.websiteId = websiteId;
  }
}
