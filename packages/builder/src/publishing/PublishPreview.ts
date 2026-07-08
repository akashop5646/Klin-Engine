export class PublishPreview {
  public generatePreviewURL(websiteId: string): string {
    return `https://${websiteId}.klin.app/preview`;
  }
}
