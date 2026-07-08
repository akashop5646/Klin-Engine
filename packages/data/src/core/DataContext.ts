import { IDataProvider } from "../providers/IDataProvider";

export interface DataContextConfig {
  workspaceId: string;
  websiteId: string;
  pageId?: string;
  provider: IDataProvider;
  locale?: string;
  registry?: any;
  cache?: any;
  eventBus?: any;
}

export class DataContext {
  public readonly workspaceId: string;
  public readonly websiteId: string;
  public pageId?: string;
  public readonly provider: IDataProvider;
  public locale: string;
  public readonly registry: any;
  public readonly cache: any;
  public readonly eventBus: any;

  constructor(config: DataContextConfig) {
    this.workspaceId = config.workspaceId;
    this.websiteId = config.websiteId;
    this.pageId = config.pageId;
    this.provider = config.provider;
    this.locale = config.locale || "en";
    this.registry = config.registry || {};
    this.cache = config.cache || {};
    this.eventBus = config.eventBus || {};
  }
}
