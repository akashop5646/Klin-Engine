export interface AIRenderHintsData {
  originalJSX: string;
  originalCSS: string;
  originalProps: Record<string, any>;
  convertedProps: Record<string, any>;
  confidence: number;
  generatedBy: string;
  version: string;
  sourceHash: string;
  generatedTimestamp: number;
}

export class AIRenderHints {
  private _hints: Map<string, AIRenderHintsData> = new Map();

  public setHints(blockId: string, hints: AIRenderHintsData): void {
    if (process.env.NODE_ENV !== "production") {
      this._hints.set(blockId, hints);
    }
  }

  public getHints(blockId: string): AIRenderHintsData | undefined {
    if (process.env.NODE_ENV !== "production") {
      return this._hints.get(blockId);
    }
    return undefined;
  }
}
