export class EmailAutomation {
  public sendOrderConfirmation(email: string, orderId: string): void {
    console.log(`Sent order confirmation to ${email} for Order: ${orderId}`);
  }
}
