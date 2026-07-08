export interface AssetReferenceConfig {
  id: string;
  provider: "cloudinary" | "local" | "s3";
  url: string;
  name: string;
  sizeBytes?: number;
  mimeType?: string;
  responsiveUrls?: Record<string, string>;
  alt?: string;
}

export class AssetReference {
  public readonly id: string;
  public readonly provider: "cloudinary" | "local" | "s3";
  public readonly url: string;
  public readonly name: string;
  public readonly sizeBytes?: number;
  public readonly mimeType?: string;
  public readonly responsiveUrls: Record<string, string>;
  public readonly alt?: string;

  constructor(config: AssetReferenceConfig) {
    this.id = config.id;
    this.provider = config.provider;
    this.url = config.url;
    this.name = config.name;
    this.sizeBytes = config.sizeBytes;
    this.mimeType = config.mimeType;
    this.responsiveUrls = config.responsiveUrls || {};
    this.alt = config.alt;
  }

  public toJSON(): Record<string, any> {
    return {
      id: this.id,
      provider: this.provider,
      url: this.url,
      name: this.name,
      sizeBytes: this.sizeBytes,
      mimeType: this.mimeType,
      responsiveUrls: this.responsiveUrls,
      alt: this.alt,
    };
  }
}
