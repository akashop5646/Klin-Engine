export class InventoryAutomation {
  public triggerLowStockReorder(sku: string, currentStock: number): void {
    if (currentStock < 5) {
      console.log(`InventoryAutomation: Triggered automatic reorder request for low-stock sku: ${sku}`);
    }
  }
}
