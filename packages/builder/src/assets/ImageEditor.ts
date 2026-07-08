export interface ImageEditPayload {
  cropX: number;
  cropY: number;
  width: number;
  height: number;
  altText: string;
}

export class ImageEditor {
  public editImageMetadata(imageUrl: string, payload: ImageEditPayload): string {
    // Configures crop adjustments or alt text mappings
    return imageUrl;
  }
}
