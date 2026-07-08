export class CommerceRuntime {
  public activeWebsiteId?: string;
  public currentCustomerId?: string;
  public baseCurrency: string = "USD";
  public activeLocale: string = "en";
  public providers: Map<string, any> = new Map();
  public cache: Map<string, any> = new Map();
  public events: any[] = [];
}
