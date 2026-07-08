export interface PackageInfo {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  homepage?: string;
  capabilities?: string[];
  dependencies?: Record<string, string>;
  compatibility?: Record<string, string>;
}

export const PACKAGE: PackageInfo = {
  name: "@klin/core",
  version: "0.1.0",
  description: "Core Operating System platform package for Klin ecosystem",
  author: "Klin Team",
  license: "MIT",
  capabilities: ["ids", "assertions", "result", "disposable", "logger", "lifecycle", "version"],
  dependencies: {},
  compatibility: {
    node: ">=18.0.0"
  }
};
