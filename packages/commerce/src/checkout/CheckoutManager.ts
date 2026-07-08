import { CheckoutSession } from "./CheckoutSession";

export class CheckoutManager {
  private _sessions: Map<string, CheckoutSession> = new Map();

  public startCheckout(cartId: string): CheckoutSession {
    const id = "chk-" + Math.random().toString(36).substring(2, 9);
    const session = new CheckoutSession(id, cartId);
    this._sessions.set(id, session);
    return session;
  }

  public getSession(id: string): CheckoutSession | undefined {
    return this._sessions.get(id);
  }
}
