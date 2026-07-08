export interface CompileThemeRequest {
  tokens: Record<string, string>;
}

export interface CompileThemeResponse {
  cssVariables: string;
  hash: string;
}
