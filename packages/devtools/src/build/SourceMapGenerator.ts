export class SourceMapGenerator {
  public generateSourceMap(source: string, compiled: string): string {
    return JSON.stringify({
      version: 3,
      sources: [source],
      names: [],
      mappings: ""
    });
  }
}
