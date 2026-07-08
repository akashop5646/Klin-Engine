export class AssetTag {
  private _tagMaps: Map<string, string[]> = new Map(); // tag -> assetIds[]

  public addTag(assetId: string, tag: string): void {
    const cleanTag = tag.trim().toLowerCase();
    if (!this._tagMaps.has(cleanTag)) {
      this._tagMaps.set(cleanTag, []);
    }
    const ids = this._tagMaps.get(cleanTag)!;
    if (!ids.includes(assetId)) {
      ids.push(assetId);
    }
  }

  public getAssetIdsForTag(tag: string): string[] {
    return this._tagMaps.get(tag.trim().toLowerCase()) || [];
  }
}
