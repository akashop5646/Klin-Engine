export class ErrorBoundaryManager {
  public catchRenderError(blockId: string, error: Error): string {
    console.error(`ErrorBoundary caught block crash [${blockId}]:`, error);
    return `<div class="klin-error-fallback" style="padding: 16px; border: 1px dashed red; color: red;">Failed to render block: ${error.message}</div>`;
  }
}
