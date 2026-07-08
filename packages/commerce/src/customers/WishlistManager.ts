export class WishlistManager {
  private _wishlists: Map<string, string[]> = new Map();

  public addToWishlist(customerId: string, sku: string): void {
    if (!this._wishlists.has(customerId)) {
      this._wishlists.set(customerId, []);
    }
    this._wishlists.get(customerId)!.push(sku);
  }

  public getWishlist(customerId: string): string[] {
    return this._wishlists.get(customerId) || [];
  }
}
