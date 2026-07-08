export class WebsiteRuntime {
  public websiteInstanceId: string;
  public activePageId?: string;
  public themeTokens: Record<string, string> = {};
  public navigationLinks: any[] = [];
  public cmsCache: Map<string, any> = new Map();
  public userSession: any = null;
  public cart: any = { items: [], total: 0 };

  constructor(websiteInstanceId: string) {
    this.websiteInstanceId = websiteInstanceId;
  }
}
