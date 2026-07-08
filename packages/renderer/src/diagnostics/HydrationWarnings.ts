export class HydrationWarnings {
  public verifyIntegrity(serverHtml: string, clientDom: string): void {
    if (serverHtml !== clientDom) {
      console.warn("Klin Hydration Mismatch Warning: server HTML does not match client rendering output");
    }
  }
}
