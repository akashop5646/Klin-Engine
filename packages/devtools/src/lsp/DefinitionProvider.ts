export interface DefinitionLocation {
  uri: string;
  range: {
    start: { line: number; character: number };
    end: { line: number; character: number };
  };
}

export class DefinitionProvider {
  public provideDefinition(uri: string, line: number, char: number): DefinitionLocation {
    console.log(`[LSP] Locating definition references for ${uri}:${line}:${char}`);
    return {
      uri,
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 10 }
      }
    };
  }
}
