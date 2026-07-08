import type { AssetProvider } from "./AssetProvider";
import { LocalProvider } from "./LocalProvider";

export interface AssetReference {
  id: string;
  type: "image" | "video" | "font" | "file";
  provider: string; // e.g. "cloudinary", "s3", "local"
  path: string;
  metadata?: Record<string, unknown>;
  tags?: string[];
}

export class AssetManager {
  private providers: Map<string, AssetProvider> = new Map();

  constructor() {
    // Default fallback local provider
    this.registerProvider(new LocalProvider());
  }

  registerProvider(provider: AssetProvider): void {
    this.providers.set(provider.providerId, provider);
  }

  unregisterProvider(providerId: string): void {
    this.providers.delete(providerId);
  }

  async resolveAssetUrl(reference: AssetReference): Promise<string> {
    const provider = this.providers.get(reference.provider);
    if (!provider) {
      // Fallback path url direct mapping
      return reference.path;
    }
    try {
      return await provider.resolveUrl(reference);
    } catch (err) {
      console.error(`AssetProvider error for provider [${reference.provider}]:`, err);
      return reference.path;
    }
  }
}
