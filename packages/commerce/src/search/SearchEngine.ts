export class SearchEngine {
  public async searchCatalog(query: string): Promise<string[]> {
    console.log(`Searching catalog for query: ${query}`);
    return [`search-result-for-${query}`];
  }
}
