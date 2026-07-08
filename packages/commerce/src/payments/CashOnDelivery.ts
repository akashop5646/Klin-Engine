import { PaymentProvider } from "./PaymentProvider";

export class CashOnDelivery implements PaymentProvider {
  public readonly name: string = "CashOnDelivery";

  public async authorizePayment(amount: number): Promise<boolean> {
    console.log(`COD registered for amount: $${amount}`);
    return true;
  }
}
