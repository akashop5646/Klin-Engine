import { PaymentProvider } from "./PaymentProvider";

export class StripeProvider implements PaymentProvider {
  public readonly name: string = "Stripe";

  public async authorizePayment(amount: number): Promise<boolean> {
    console.log(`Stripe charged amount: $${amount}`);
    return true;
  }
}
