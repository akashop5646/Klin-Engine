export interface SearchProvider {
  readonly name: string;
  querySearch(query: string): Promise<string[]>;
}
