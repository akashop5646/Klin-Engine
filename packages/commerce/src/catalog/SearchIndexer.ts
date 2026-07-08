export class SearchIndexer {
  public async indexProduct(product: any): Promise<void> {
    console.log(`SearchIndexer indexed product: ${product.id}`);
  }
}
