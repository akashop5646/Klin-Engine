export class BuilderSerializer {
  public serialize(layoutTree: any, themeTokens: any): string {
    return JSON.stringify({
      version: "1.0",
      layoutTree,
      themeTokens,
      exportedAtMs: Date.now(),
    });
  }
}
