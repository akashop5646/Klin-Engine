export class Autocomplete {
  public suggestTerms(prefix: string): string[] {
    return [prefix + " product", prefix + " variant"];
  }
}
