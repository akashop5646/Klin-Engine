import { Cart } from "./Cart";

export class CartCalculator {
  public calculateSubtotal(cart: Cart): number {
    return cart.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }
}
