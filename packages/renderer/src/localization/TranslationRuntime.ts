export class TranslationRuntime {
  private _bundles: Map<string, Record<string, string>> = new Map();

  public registerBundle(locale: string, translations: Record<string, string>): void {
    this._bundles.set(locale, translations);
  }

  public translate(locale: string, key: string): string {
    const bundle = this._bundles.get(locale);
    return bundle ? bundle[key] || key : key;
  }
}
