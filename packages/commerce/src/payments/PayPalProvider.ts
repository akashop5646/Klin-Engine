import { PaymentProvider } from "./PaymentProvider";

export class PayPalProvider implements PaymentProvider {
  public readonly name: string = "PayPal";

  public async authorizePayment(amount: number): Promise<boolean> {
    console.log(`PayPal authorized amount: $${amount}`);
    return true;
  }
}
