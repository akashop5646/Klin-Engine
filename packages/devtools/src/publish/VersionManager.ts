export class VersionManager {
  public bumpVersion(currentVersion: string, bumpType: "major" | "minor" | "patch"): string {
    const parts = currentVersion.split(".").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
      throw new Error(`Invalid version format: ${currentVersion}`);
    }

    if (bumpType === "major") parts[0]++;
    else if (bumpType === "minor") parts[1]++;
    else parts[2]++;

    return parts.join(".");
  }
}
