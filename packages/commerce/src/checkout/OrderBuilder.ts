export class OrderBuilder {
  public compileOrderData(cartId: string, address: any): any {
    return {
      orderId: "ord-" + Math.random().toString(36).substring(2, 9),
      cartId,
      address,
      createdAt: Date.now(),
    };
  }
}
