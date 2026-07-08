import { Result, Ok, Err } from "@klin/core";

export class ManifestValidator {
  validate(manifest: any): Result<void, Error> {
    if (!manifest) {
      return new Err<void, Error>(new Error("Manifest is empty"));
    }
    if (typeof manifest.id !== "string" || !manifest.id) {
      return new Err<void, Error>(new Error("Manifest id must be a non-empty string"));
    }
    if (typeof manifest.name !== "string" || !manifest.name) {
      return new Err<void, Error>(new Error("Manifest name must be a non-empty string"));
    }
    if (typeof manifest.version !== "string" || !manifest.version) {
      return new Err<void, Error>(new Error("Manifest version must be a non-empty string"));
    }
    const validTypes = ["component", "block", "template", "theme", "plugin", "extension", "marketplace"];
    if (!validTypes.includes(manifest.type)) {
      return new Err<void, Error>(new Error(`Invalid package type: ${manifest.type}`));
    }
    if (!Array.isArray(manifest.assets)) {
      return new Err<void, Error>(new Error("Manifest assets must be an array"));
    }
    return new Ok<void, Error>(undefined);
  }
}
