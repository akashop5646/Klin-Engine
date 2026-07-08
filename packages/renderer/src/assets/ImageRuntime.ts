export class ImageRuntime {
  public renderBlurPlaceholder(imageUrl: string): string {
    return `<div style="background-image: url(${imageUrl}); filter: blur(20px);"></div>`;
  }
}
