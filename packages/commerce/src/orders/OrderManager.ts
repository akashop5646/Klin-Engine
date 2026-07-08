import { Order } from "./Order";

export class OrderManager {
  private _orders: Map<string, Order> = new Map();

  public registerOrder(order: Order): void {
    this._orders.set(order.id, order);
  }

  public getOrder(id: string): Order | undefined {
    return this._orders.get(id);
  }
}
