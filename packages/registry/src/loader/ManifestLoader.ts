import { Result, Ok, Err } from "@klin/core";
import { ManifestValidator } from "../validation/ManifestValidator";

export interface PackageManifest {
  id: string;
  name: string;
  version: string;
  type: "component" | "block" | "template" | "theme" | "plugin" | "extension" | "marketplace";
  dependencies?: Record<string, string>;
  assets: any[];
}

export class ManifestLoader {
  private validator = new ManifestValidator();

  load(rawManifest: any): Result<PackageManifest, Error> {
    const valResult = this.validator.validate(rawManifest);
    if (!valResult.ok) {
      return new Err<PackageManifest, Error>(valResult.error);
    }
    return new Ok<PackageManifest, Error>(rawManifest as PackageManifest);
  }
}
