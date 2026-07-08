import type { AssetProvider } from "./AssetProvider";
import type { AssetReference } from "./AssetManager";

export class CloudinaryProvider implements AssetProvider {
  readonly providerId = "cloudinary";

  resolveUrl(reference: AssetReference): string {
    // Cloudinary domain resolution mapping
    return `https://res.cloudinary.com/demo/image/upload/${reference.path}`;
  }
}
