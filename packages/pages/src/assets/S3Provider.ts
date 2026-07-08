import type { AssetProvider } from "./AssetProvider";
import type { AssetReference } from "./AssetManager";

export class S3Provider implements AssetProvider {
  readonly providerId = "s3";
  private bucket: string;

  constructor(bucket: string = "klin-bucket") {
    this.bucket = bucket;
  }

  resolveUrl(reference: AssetReference): string {
    return `https://${this.bucket}.s3.amazonaws.com/${reference.path}`;
  }
}
