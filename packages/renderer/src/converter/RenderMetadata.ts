export interface ConversionRecord {
  blockId: string;
  originalReactComponent: string;
  originalJSX: string;
  generatedKlinBlock: string;
  converterVersion: string;
  aiNotes?: string;
}

export class RenderMetadata {
  private _records: Map<string, ConversionRecord> = new Map();

  public addRecord(record: ConversionRecord): void {
    this._records.set(record.blockId, record);
  }

  public getRecord(blockId: string): ConversionRecord | undefined {
    return this._records.get(blockId);
  }
}
