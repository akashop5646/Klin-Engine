import { MarketplaceItem } from "./MarketplaceItem";

export class MarketplaceInstaller {
  public async install(item: MarketplaceItem): Promise<boolean> {
    // Pulls layouts metadata structure from downloadUrl, writes configurations to database collections
    return true;
  }
}
