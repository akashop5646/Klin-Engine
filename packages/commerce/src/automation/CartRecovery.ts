export class CartRecoveryAutomation {
  public async recoveryAlert(customerId: string): Promise<boolean> {
    console.log(`Sending abandoned cart recovery alert to customer: ${customerId}`);
    return true;
  }
}
