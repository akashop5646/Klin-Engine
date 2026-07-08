export class StockAdjustment {
  public adjustStock(sku: string, qty: number, reason: string): void {
    console.log(`Adjusted stock for ${sku} by ${qty}. Reason: ${reason}`);
  }
}
