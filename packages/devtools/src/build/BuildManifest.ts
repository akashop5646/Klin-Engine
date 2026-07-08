export interface BuildManifestData {
  version: string;
  hash: string;
  generatedFiles: string[];
  durationMs: number;
  warnings: string[];
  errors: string[];
}

export class BuildManifest {
  public serialize(data: BuildManifestData): string {
    return JSON.stringify({
      version: data.version,
      hash: data.hash,
      generatedFiles: data.generatedFiles,
      durationMs: data.durationMs,
      warnings: data.warnings,
      errors: data.errors
    }, null, 2);
  }
}
