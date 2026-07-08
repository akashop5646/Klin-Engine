export class PreviewManager {
  public startPreview(websiteId: string): string {
    const previewUrl = `https://preview.klin.dev/preview/${websiteId}`;
    console.log(`Preview session started for website ${websiteId}: ${previewUrl}`);
    return previewUrl;
  }
}
