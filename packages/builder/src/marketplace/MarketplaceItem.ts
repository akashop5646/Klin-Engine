export type MarketplaceType = "Theme" | "Block" | "Component" | "Template" | "Plugin";

export class MarketplaceItem {
  public id: string;
  public label: string;
  public type: MarketplaceType;
  public downloadUrl: string;

  constructor(id: string, label: string, type: MarketplaceType, downloadUrl: string) {
    this.id = id;
    this.label = label;
    this.type = type;
    this.downloadUrl = downloadUrl;
  }
}
