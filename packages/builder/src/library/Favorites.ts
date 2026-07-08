export class Favorites {
  private _favoriteTypes: Set<string> = new Set();

  public toggleFavorite(type: string): void {
    if (this._favoriteTypes.has(type)) {
      this._favoriteTypes.delete(type);
    } else {
      this._favoriteTypes.add(type);
    }
  }

  public getFavorites(): string[] {
    return Array.from(this._favoriteTypes);
  }
}
