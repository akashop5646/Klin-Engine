export class CommerceRouter {
  public route(path: string): string {
    return `/api/commerce/v1/${path}`;
  }
}
