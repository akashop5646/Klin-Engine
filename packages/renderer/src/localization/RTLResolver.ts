export class RTLResolver {
  public isRTL(locale: string): boolean {
    const rtlLocales = ["ar", "he", "fa", "ur"];
    return rtlLocales.includes(locale.toLowerCase());
  }
}
