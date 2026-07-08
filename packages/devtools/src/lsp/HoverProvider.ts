export interface HoverInfo {
  contents: string;
}

export class HoverProvider {
  public provideHover(uri: string, line: number, char: number): HoverInfo {
    console.log(`[LSP] Providing hover details for ${uri}:${line}:${char}`);
    return { contents: "**Klin Configuration Field**\n\nSets properties for compile profiles." };
  }
}
