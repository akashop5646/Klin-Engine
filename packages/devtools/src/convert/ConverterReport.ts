export class ConverterReport {
  public converted: string[];
  public warnings: string[];
  public generatedBlocksCount: number;
  public skippedCount: number;

  constructor(converted: string[], warnings: string[], generatedBlocksCount: number, skippedCount: number) {
    this.converted = converted;
    this.warnings = warnings;
    this.generatedBlocksCount = generatedBlocksCount;
    this.skippedCount = skippedCount;
  }

  public serialize(): string {
    return JSON.stringify({
      converted: this.converted,
      warnings: this.warnings,
      generatedBlocksCount: this.generatedBlocksCount,
      skippedCount: this.skippedCount
    }, null, 2);
  }
}
