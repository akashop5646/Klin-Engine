import type { AssetReference } from "./AssetManager";

export interface AssetProvider {
  providerId: string;
  resolveUrl(reference: AssetReference): Promise<string> | string;
  upload?(file: File | Blob, path: string): Promise<AssetReference>;
  delete?(reference: AssetReference): Promise<void>;
}
