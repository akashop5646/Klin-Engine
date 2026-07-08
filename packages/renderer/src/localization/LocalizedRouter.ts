export class LocalizedRouter {
  public getLocalizedUrl(route: string, locale: string): string {
    if (locale === "en") return route;
    const cleanRoute = route.startsWith("/") ? route : `/${route}`;
    return `/${locale}${cleanRoute}`;
  }
}
