import type { AssetProvider } from "./AssetProvider";
import type { AssetReference } from "./AssetManager";

export class SupabaseProvider implements AssetProvider {
  readonly providerId = "supabase";
  private projectUrl: string;

  constructor(projectUrl: string = "https://klin.supabase.co") {
    this.projectUrl = projectUrl;
  }

  resolveUrl(reference: AssetReference): string {
    return `${this.projectUrl}/storage/v1/object/public/${reference.path}`;
  }
}
