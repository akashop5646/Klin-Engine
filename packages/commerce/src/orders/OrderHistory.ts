import { Order } from "./Order";

export class OrderHistory {
  private _history: Order[] = [];

  public log(order: Order): void {
    this._history.push(order);
  }

  public get history(): Order[] {
    return this._history;
  }
}
