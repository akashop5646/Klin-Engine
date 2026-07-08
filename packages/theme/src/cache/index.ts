export class ThemeCache {
  private rawTheme = new Map<string, any>();
  private resolvedTokens = new Map<string, any>();
  private compiledCSS = new Map<string, string>();
  private runtimeStyle = new Map<string, any>();

  getRaw(key: string): any { return this.rawTheme.get(key); }
  setRaw(key: string, val: any) { this.rawTheme.set(key, val); }

  getResolved(key: string): any { return this.resolvedTokens.get(key); }
  setResolved(key: string, val: any) { this.resolvedTokens.set(key, val); }

  getCompiled(key: string): string | undefined { return this.compiledCSS.get(key); }
  setCompiled(key: string, val: string) { this.compiledCSS.set(key, val); }

  getRuntime(key: string): any { return this.runtimeStyle.get(key); }
  setRuntime(key: string, val: any) { this.runtimeStyle.set(key, val); }

  clear() {
    this.rawTheme.clear();
    this.resolvedTokens.clear();
    this.compiledCSS.clear();
    this.runtimeStyle.clear();
  }
}
