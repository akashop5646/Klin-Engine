export interface Version {
  major: number;
  minor: number;
  patch: number;
}

export function parseVersion(versionStr: string): Version {
  const clean = versionStr.replace(/^[v^~]/, "");
  const [major, minor, patch] = clean.split(".").map((s) => parseInt(s, 10));
  return {
    major: isNaN(major) ? 0 : major,
    minor: isNaN(minor) ? 0 : minor,
    patch: isNaN(patch) ? 0 : patch,
  };
}

export function equals(v1: string, v2: string): boolean {
  const a = parseVersion(v1);
  const b = parseVersion(v2);
  return a.major === b.major && a.minor === b.minor && a.patch === b.patch;
}

export function greaterThan(v1: string, v2: string): boolean {
  const a = parseVersion(v1);
  const b = parseVersion(v2);
  if (a.major !== b.major) return a.major > b.major;
  if (a.minor !== b.minor) return a.minor > b.minor;
  return a.patch > b.patch;
}

export function lessThan(v1: string, v2: string): boolean {
  const a = parseVersion(v1);
  const b = parseVersion(v2);
  if (a.major !== b.major) return a.major < b.major;
  if (a.minor !== b.minor) return a.minor < b.minor;
  return a.patch < b.patch;
}

export function satisfies(version: string, range: string): boolean {
  if (range === "*") return true;
  if (range.startsWith("^")) {
    const v = parseVersion(version);
    const r = parseVersion(range);
    return v.major === r.major && (v.minor > r.minor || (v.minor === r.minor && v.patch >= r.patch));
  }
  return equals(version, range);
}

export function upgradePath(from: string, to: string): "major" | "minor" | "patch" | "none" {
  const a = parseVersion(from);
  const b = parseVersion(to);
  if (b.major > a.major) return "major";
  if (b.minor > a.minor) return "minor";
  if (b.patch > a.patch) return "patch";
  return "none";
}
