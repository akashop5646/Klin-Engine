import { VersionManager } from "../versioning/VersionManager";

export class CompatibilityResolver {
  private versionManager = new VersionManager();

  checkCompatibility(coreVersion: string, requiredRange: string): boolean {
    return this.versionManager.isCompatible(coreVersion, requiredRange);
  }
}
