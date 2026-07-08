import { OrderItem } from "./OrderItem";
import { OrderStatus } from "./OrderStatus";

export class Order {
  public id: string;
  public items: OrderItem[] = [];
  public status: OrderStatus = OrderStatus.Pending;
  public total: number;

  constructor(id: string, total: number) {
    this.id = id;
    this.total = total;
  }
}
