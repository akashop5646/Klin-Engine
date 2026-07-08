export class CategoryManager {
  private _categories: string[] = ["Layout", "Hero", "Cards", "CTA", "Forms", "Pricing", "Footer", "Navbar"];

  public getCategories(): string[] {
    return this._categories;
  }

  public addCategory(cat: string): void {
    this._categories.push(cat);
  }
}
