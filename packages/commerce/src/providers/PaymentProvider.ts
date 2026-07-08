import { PaymentProvider as CommercePaymentProvider } from "../payments/PaymentProvider";

export interface ExternalPaymentProvider extends CommercePaymentProvider {
  processCharge?(amount: number): Promise<boolean>;
}
