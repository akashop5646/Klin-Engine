import { Product } from "./Product";

export class CatalogManager {
  private _products: Map<string, Product> = new Map();

  public addProduct(product: Product): void {
    this._products.set(product.id, product);
  }

  public getProduct(id: string): Product | undefined {
    return this._products.get(id);
  }
}
