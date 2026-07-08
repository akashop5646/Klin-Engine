export class FulfillmentManager {
  public async fulfillOrder(orderId: string): Promise<string> {
    console.log(`FulfillmentManager started processing Order: ${orderId}`);
    return `ful-${Math.random().toString(36).substring(2, 9)}`;
  }
}
