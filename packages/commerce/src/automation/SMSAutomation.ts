export class SMSAutomation {
  public sendDeliveryUpdate(phone: string, trackingNumber: string): void {
    console.log(`Sent SMS delivery update to ${phone} tracking: ${trackingNumber}`);
  }
}
