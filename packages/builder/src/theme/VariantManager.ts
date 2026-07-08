export class VariantManager {
  private _variants: Map<string, string[]> = new Map(); // blockType -> variants list

  constructor() {
    this.registerDefaults();
  }

  public register(blockType: string, variantNames: string[]): void {
    this._variants.set(blockType, variantNames);
  }

  public getVariants(blockType: string): string[] {
    return this._variants.get(blockType) || [];
  }

  private registerDefaults(): void {
    this.register("Button", ["Primary", "Outline", "Ghost", "Danger", "Icon", "Gradient"]);
    this.register("Card", ["Flat", "Shadow", "Outline", "Interactive"]);
  }
}
