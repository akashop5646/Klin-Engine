export interface ArtifactMetadataRecord {
  hash: string;
  sourceFiles: string[];
  dependencies: string[];
  buildTimeMs: number;
}

export class ArtifactMetadata {
  private _records: Map<string, ArtifactMetadataRecord> = new Map();

  public set(path: string, record: ArtifactMetadataRecord): void {
    this._records.set(path, record);
  }

  public get(path: string): ArtifactMetadataRecord | undefined {
    return this._records.get(path);
  }
}
