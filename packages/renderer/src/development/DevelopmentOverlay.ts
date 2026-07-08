export class DevelopmentOverlay {
  public drawOverlay(blockId: string, durationMs: number): string {
    return `<div style="position: absolute; border: 1px dashed blue; background: rgba(0,0,255,0.1); color: blue; padding: 4px; font-size: 10px;">ID: ${blockId} (${durationMs}ms)</div>`;
  }
}
