export class WebsiteManager {
  public editLayout(websiteId: string, pageId: string, layout: any): void {
    console.log(`WebsiteManager updated layouts for page: ${pageId} in website: ${websiteId}`);
  }

  public getWebsiteInstance(websiteId: string): any {
    return { id: websiteId, title: "Klin Instance" };
  }
}
