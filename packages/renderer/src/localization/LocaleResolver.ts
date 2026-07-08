export class LocaleResolver {
  public resolveLocale(headers: Record<string, string>): string {
    const langHeader = headers["accept-language"];
    if (langHeader) {
      const firstLang = langHeader.split(",")[0];
      return firstLang.split("-")[0]; // e.g. "en" or "fr"
    }
    return "en";
  }
}
