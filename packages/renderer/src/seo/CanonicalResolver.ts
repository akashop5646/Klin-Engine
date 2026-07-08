export class CanonicalResolver {
  public resolveCanonical(baseUrl: string, routePath: string): string {
    const cleanRoute = routePath.startsWith("/") ? routePath : `/${routePath}`;
    return `${baseUrl}${cleanRoute}`;
  }
}
