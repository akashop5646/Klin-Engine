export class CartRecovery {
  public triggerRecoverySequence(customerId: string, cartId: string): void {
    console.log(`Triggered CartRecovery email alerts sequence for customer ${customerId} cart: ${cartId}`);
  }
}
