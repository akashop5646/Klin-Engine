export class LocalizationManager {
  private _supportedLocales: string[] = ["en"];

  constructor(locales: string[] = ["en", "fr", "hi", "ja"]) {
    this._supportedLocales = locales;
  }

  public getSupportedLocales(): string[] {
    return this._supportedLocales;
  }

  public isLocaleSupported(locale: string): boolean {
    return this._supportedLocales.includes(locale);
  }

  public addSupportedLocale(locale: string): void {
    if (!this._supportedLocales.includes(locale)) {
      this._supportedLocales.push(locale);
    }
  }
}
