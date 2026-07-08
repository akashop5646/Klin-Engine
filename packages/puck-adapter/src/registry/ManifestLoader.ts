import { Result, Ok, Err } from "@klin/core";

export interface ComponentManifest {
  id: string;
  name: string;
  category?: string;
  version: string;
  description?: string;
  assets?: any[];
}

export class ManifestLoader {
  static load(raw: any): Result<ComponentManifest, Error> {
    if (!raw) {
      return new Err(new Error("Manifest content is empty"));
    }
    if (!raw.id) {
      return new Err(new Error("Manifest must specify a valid id"));
    }
    if (!raw.name) {
      return new Err(new Error("Manifest must specify a valid name"));
    }
    if (!raw.version) {
      return new Err(new Error("Manifest must specify a valid version"));
    }

    return new Ok<ComponentManifest, Error>({
      id: raw.id,
      name: raw.name,
      category: raw.category || "General",
      version: raw.version,
      description: raw.description,
      assets: raw.assets || [],
    });
  }
}
