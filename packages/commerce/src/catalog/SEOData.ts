export class SEOData {
  public metaTitle: string;
  public metaDescription: string;
  public urlKey: string;

  constructor(metaTitle: string, metaDescription: string, urlKey: string) {
    this.metaTitle = metaTitle;
    this.metaDescription = metaDescription;
    this.urlKey = urlKey;
  }
}
