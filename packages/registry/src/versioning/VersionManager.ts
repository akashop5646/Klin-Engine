export class VersionManager {
  compare(v1: string, v2: string): number {
    const parse = (v: string) => v.split(".").map(Number);
    const p1 = parse(v1);
    const p2 = parse(v2);

    for (let i = 0; i < 3; i++) {
      const a = p1[i] || 0;
      const b = p2[i] || 0;
      if (a !== b) return a - b;
    }
    return 0;
  }

  isCompatible(version: string, range: string): boolean {
    if (range === "*" || range === "any") return true;
    if (range.startsWith("^")) {
      const min = range.substring(1);
      const parsedMin = min.split(".").map(Number);
      const parsedVer = version.split(".").map(Number);
      return parsedVer[0] === parsedMin[0] && this.compare(version, min) >= 0;
    }
    if (range.startsWith(">=")) {
      const min = range.substring(2);
      return this.compare(version, min) >= 0;
    }
    return this.compare(version, range) === 0;
  }
}
