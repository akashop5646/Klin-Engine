export class PaymentAudit {
  public logTransaction(transactionId: string, amount: number, status: string): void {
    console.log(`Payment Audit Log: transactionId: ${transactionId} amount: ${amount} status: ${status}`);
  }
}
