import { Cart } from "./Cart";

export class SavedCart {
  public id: string;
  public customerId: string;
  public cart: Cart;

  constructor(id: string, customerId: string, cart: Cart) {
    this.id = id;
    this.customerId = customerId;
    this.cart = cart;
  }
}
