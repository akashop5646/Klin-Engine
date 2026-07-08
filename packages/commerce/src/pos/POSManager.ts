export class POSManager {
  public async openRegisterSession(registerId: string, initialCash: number): Promise<void> {
    console.log(`Opened POS register session for: ${registerId} with initial cash: $${initialCash}`);
  }
}
