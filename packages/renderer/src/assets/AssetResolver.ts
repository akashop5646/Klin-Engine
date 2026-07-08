export class AssetResolver {
  public resolveAssetUrl(assetId: string): string {
    return `https://res.cloudinary.com/klin/image/upload/${assetId}`;
  }
}
