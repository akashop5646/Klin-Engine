import { Variant } from "./Variant";
import { SEOData } from "./SEOData";

export class Product {
  public id: string;
  public name: string;
  public sku: string;
  public variants: Variant[] = [];
  public seo?: SEOData;

  constructor(id: string, name: string, sku: string) {
    this.id = id;
    this.name = name;
    this.sku = sku;
  }
}
