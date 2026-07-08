import { BuildManifestData } from "./BuildManifest";

export class ManifestGenerator {
  public generate(manifestData: BuildManifestData): string {
    return JSON.stringify(manifestData, null, 2);
  }
}
