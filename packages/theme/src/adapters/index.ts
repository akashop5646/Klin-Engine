export interface ThemeAdapter {
  generate(compiledCSS: string, scope: string): string;
}

export class CSSVariablesAdapter implements ThemeAdapter {
  generate(compiledCSS: string, scope: string): string {
    return `${scope} {\n${compiledCSS}\n}`;
  }
}
