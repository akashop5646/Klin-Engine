import type { AssetProvider } from "./AssetProvider";
import type { AssetReference } from "./AssetManager";

export class VercelBlobProvider implements AssetProvider {
  readonly providerId = "vercel-blob";

  resolveUrl(reference: AssetReference): string {
    return `https://public.blob.vercel-storage.com/${reference.path}`;
  }
}
