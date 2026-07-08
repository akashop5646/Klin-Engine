import { CompletionProvider } from "./CompletionProvider";
import { DiagnosticsProvider } from "./DiagnosticsProvider";

export class LanguageServer {
  private _completion: CompletionProvider;
  private _diagnostics: DiagnosticsProvider;

  constructor(completion: CompletionProvider, diagnostics: DiagnosticsProvider) {
    this._completion = completion;
    this._diagnostics = diagnostics;
  }

  public async startServer(): Promise<void> {
    console.log("[LSP] Starting Language Server Protocol RPC interface...");
  }

  public getCompletionItems(documentUri: string, line: number, character: number): string[] {
    return this._completion.provideCompletions(documentUri, line, character);
  }

  public validateDocument(documentUri: string, content: string): any[] {
    return this._diagnostics.provideDiagnostics(documentUri, content);
  }
}
