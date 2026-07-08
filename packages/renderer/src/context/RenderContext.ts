export interface RenderContextConfig {
  websiteId: string;
  pageId: string;
  locale?: string;
  themeId?: string;
  device?: string;
  headers?: Record<string, string>;
  cookies?: Record<string, string>;
}

export class RenderContext {
  public readonly websiteId: string;
  public readonly pageId: string;
  public locale: string;
  public themeId?: string;
  public device: string;
  public headers: Record<string, string>;
  public cookies: Record<string, string>;

  constructor(config: RenderContextConfig) {
    this.websiteId = config.websiteId;
    this.pageId = config.pageId;
    this.locale = config.locale || "en";
    this.themeId = config.themeId;
    this.device = config.device || "Desktop";
    this.headers = config.headers || {};
    this.cookies = config.cookies || {};
  }
}
