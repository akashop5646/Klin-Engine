import type { AssetProvider } from "./AssetProvider";
import type { AssetReference } from "./AssetManager";

export class LocalProvider implements AssetProvider {
  readonly providerId = "local";

  resolveUrl(reference: AssetReference): string {
    return `/assets/${reference.path}`;
  }
}
