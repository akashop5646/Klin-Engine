import { StockItem } from "./StockItem";
import { Reservation } from "./Reservation";

export class InventoryManager {
  private _stock: Map<string, StockItem> = new Map();
  private _reservations: Reservation[] = [];

  public updateStock(sku: string, qty: number): void {
    const item = this._stock.get(sku) || new StockItem(sku, "wh-default", 0);
    item.quantityOnHand = qty;
    this._stock.set(sku, item);
  }

  public reserveStock(sku: string, qty: number, ttlSec: number): boolean {
    const item = this._stock.get(sku);
    if (!item || (item.quantityOnHand - item.quantityReserved) < qty) {
      return false; // Oversell check failed
    }
    item.quantityReserved += qty;
    const resId = "res-" + Math.random().toString(36).substring(2, 9);
    this._reservations.push(new Reservation(resId, sku, qty, Date.now() + ttlSec * 1000));
    return true;
  }

  public getAvailableStock(sku: string): number {
    const item = this._stock.get(sku);
    if (!item) return 0;
    return item.quantityOnHand - item.quantityReserved;
  }
}
