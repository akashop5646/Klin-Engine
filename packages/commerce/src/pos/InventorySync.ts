export class InventorySync {
  public async syncLocalRegisterStock(registerId: string, skus: string[]): Promise<boolean> {
    console.log(`InventorySync synchronizing stock levels for POS register: ${registerId}`);
    return true;
  }
}
