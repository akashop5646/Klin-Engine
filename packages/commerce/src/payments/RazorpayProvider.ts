import { PaymentProvider } from "./PaymentProvider";

export class RazorpayProvider implements PaymentProvider {
  public readonly name: string = "Razorpay";

  public async authorizePayment(amount: number): Promise<boolean> {
    console.log(`Razorpay charged amount: $${amount}`);
    return true;
  }
}
