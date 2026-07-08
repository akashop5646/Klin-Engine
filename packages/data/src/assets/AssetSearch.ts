import { AssetReference } from "../fields/AssetReference";

export class AssetSearch {
  public static query(assets: AssetReference[], queryText: string): AssetReference[] {
    const term = queryText.toLowerCase().trim();
    if (!term) return assets;

    return assets.filter((asset) => {
      return (
        asset.name.toLowerCase().includes(term) ||
        (asset.alt && asset.alt.toLowerCase().includes(term)) ||
        asset.mimeType?.toLowerCase().includes(term)
      );
    });
  }
}
