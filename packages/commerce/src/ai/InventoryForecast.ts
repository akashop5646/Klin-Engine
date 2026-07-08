export class InventoryForecast {
  public predictStockDaysRemaining(sku: string, currentStock: number): number {
    return Math.floor(currentStock / 2.5); // forecast remaining days
  }
}
