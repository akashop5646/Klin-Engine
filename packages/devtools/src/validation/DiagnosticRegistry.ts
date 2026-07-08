export interface DiagnosticDefinition {
  code: string;
  severity: "Error" | "Warning" | "Info";
  messageTemplate: string;
}

export class DiagnosticRegistry {
  private _diagnostics: Map<string, DiagnosticDefinition> = new Map();

  constructor() {
    this.register({ code: "KLIN0001", severity: "Error", messageTemplate: "Workspace lock acquired. Build aborted." });
    this.register({ code: "KLIN0010", severity: "Error", messageTemplate: "Missing required config file: klin.config.ts" });
    this.register({ code: "KLIN0100", severity: "Warning", messageTemplate: "Asset size budget exceeded: {assetPath}" });
    this.register({ code: "KLIN0200", severity: "Error", messageTemplate: "Circular dependency detected: {path}" });
  }

  public register(diag: DiagnosticDefinition): void {
    this._diagnostics.set(diag.code, diag);
  }

  public get(code: string): DiagnosticDefinition | undefined {
    return this._diagnostics.get(code);
  }
}
