import { Cart } from "./Cart";
import { CartItem } from "./CartItem";

export class CartManager {
  private _carts: Map<string, Cart> = new Map();

  public getOrCreateCart(cartId: string): Cart {
    if (!this._carts.has(cartId)) {
      this._carts.set(cartId, new Cart(cartId));
    }
    return this._carts.get(cartId)!;
  }

  public addItem(cartId: string, sku: string, quantity: number, unitPrice: number): void {
    const cart = this.getOrCreateCart(cartId);
    const existing = cart.items.find((i) => i.sku === sku);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push(new CartItem(sku, quantity, unitPrice));
    }
  }
}
