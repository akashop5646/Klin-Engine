export class CommerceManager {
  public createProduct(name: string, sku: string): any {
    return { id: "prod-" + Math.random().toString(36).substring(2, 9), name, sku };
  }

  public createOrder(cartId: string, total: number): any {
    return { id: "ord-" + Math.random().toString(36).substring(2, 9), cartId, total, status: "Pending" };
  }

  public checkout(orderId: string): string {
    return `Successfully initiated checkout session for Order: ${orderId}`;
  }

  public refund(orderId: string, amount: number): string {
    return `Initiated refund of $${amount} for Order: ${orderId}`;
  }

  public cancelOrder(orderId: string): void {
    console.log(`Cancelled Order: ${orderId}`);
  }
}
