export interface BlockConversionMap {
  originalReactComponent: string;
  originalFile: string;
  originalProps: Record<string, any>;
  originalTailwindClasses?: string;
  generatedBlockType: string;
}

export class ConverterMetadata {
  private _metadata: Map<string, BlockConversionMap> = new Map(); // blockId -> conversionMap

  public register(blockId: string, map: BlockConversionMap): void {
    this._metadata.set(blockId, map);
  }

  public getMetadata(blockId: string): BlockConversionMap | undefined {
    return this._metadata.get(blockId);
  }
}
