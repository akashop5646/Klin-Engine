export interface BuildArtifact {
  path: string;
  type: "JS" | "CSS" | "Font" | "Image" | "SourceMap" | "Manifest";
  sizeBytes: number;
}

export class ArtifactRegistry {
  private _artifacts: Map<string, BuildArtifact> = new Map();

  public register(artifact: BuildArtifact): void {
    this._artifacts.set(artifact.path, artifact);
  }

  public get(path: string): BuildArtifact | undefined {
    return this._artifacts.get(path);
  }

  public list(): BuildArtifact[] {
    return Array.from(this._artifacts.values());
  }

  public clear(): void {
    this._artifacts.clear();
  }
}
