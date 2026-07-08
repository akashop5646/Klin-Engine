export class FulfillmentWorkflow {
  public async executeWorkflow(orderId: string): Promise<void> {
    console.log(`Running fulfillment pipeline workflow for Order: ${orderId}...`);
  }
}
