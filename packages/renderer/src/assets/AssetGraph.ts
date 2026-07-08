export interface AssetReference {
  assetPath: string;
  blockId: string;
  pageId: string;
  websiteId: string;
}

export class AssetGraph {
  private _assetToRefs: Map<string, Set<AssetReference>> = new Map();

  public registerAssetDependency(ref: AssetReference): void {
    if (!this._assetToRefs.has(ref.assetPath)) {
      this._assetToRefs.set(ref.assetPath, new Set());
    }
    this._assetToRefs.get(ref.assetPath)!.add(ref);
  }

  public getReferences(assetPath: string): AssetReference[] {
    const list = this._assetToRefs.get(assetPath);
    return list ? Array.from(list) : [];
  }
}
