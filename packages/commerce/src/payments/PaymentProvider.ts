export interface PaymentProvider {
  readonly name: string;
  authorizePayment(amount: number): Promise<boolean>;
}
