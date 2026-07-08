export class CompletionProvider {
  public provideCompletions(uri: string, line: number, char: number): string[] {
    console.log(`[LSP] Providing autocompletions for ${uri}:${line}:${char}`);
    return ["projectName", "version", "buildProfile", "devServer", "assetsDir"];
  }
}
