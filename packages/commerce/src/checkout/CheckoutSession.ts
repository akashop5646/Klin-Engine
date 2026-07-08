export class CheckoutSession {
  public id: string;
  public cartId: string;
  public shippingAddress: any = null;
  public paymentMethod: string = "";
  public status: "Active" | "Completed" | "Expired" = "Active";

  constructor(id: string, cartId: string) {
    this.id = id;
    this.cartId = cartId;
  }
}
