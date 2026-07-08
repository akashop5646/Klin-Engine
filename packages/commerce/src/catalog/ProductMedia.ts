export class ProductMedia {
  public url: string;
  public altText?: string;
  public sortOrder: number;

  constructor(url: string, sortOrder: number, altText?: string) {
    this.url = url;
    this.sortOrder = sortOrder;
    this.altText = altText;
  }
}
