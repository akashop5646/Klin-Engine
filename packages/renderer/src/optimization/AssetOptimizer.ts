import type { AssetReference } from "@klin/pages";

export class AssetOptimizer {
  optimizeAssets(assets: AssetReference[]): AssetReference[] {
    const seen = new Set<string>();
    return assets.filter((asset) => {
      const key = `${asset.provider}:${asset.path}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}
