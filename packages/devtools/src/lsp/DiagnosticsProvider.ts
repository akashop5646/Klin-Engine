export interface DiagnosticItem {
  severity: "Error" | "Warning" | "Info";
  message: string;
  range: {
    start: { line: number; character: number };
    end: { line: number; character: number };
  };
}

export class DiagnosticsProvider {
  public provideDiagnostics(uri: string, content: string): DiagnosticItem[] {
    console.log(`[LSP] Providing code diagnostics verification for: ${uri}`);
    const diagnostics: DiagnosticItem[] = [];
    if (!content.includes("projectName")) {
      diagnostics.push({
        severity: "Error",
        message: "Missing 'projectName' definition in config layout.",
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 20 }
        }
      });
    }
    return diagnostics;
  }
}
