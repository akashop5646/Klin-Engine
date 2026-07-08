export class BuilderDeserializer {
  public deserialize(serializedStr: string): { layoutTree: any; themeTokens: any } {
    try {
      const parsed = JSON.parse(serializedStr);
      return {
        layoutTree: parsed.layoutTree || [],
        themeTokens: parsed.themeTokens || {},
      };
    } catch {
      return { layoutTree: [], themeTokens: {} };
    }
  }
}
