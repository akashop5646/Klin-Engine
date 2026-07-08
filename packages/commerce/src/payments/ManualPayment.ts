import { PaymentProvider } from "./PaymentProvider";

export class ManualPayment implements PaymentProvider {
  public readonly name: string = "Manual";

  public async authorizePayment(amount: number): Promise<boolean> {
    console.log(`Manual payment logged for amount: $${amount}`);
    return true;
  }
}
