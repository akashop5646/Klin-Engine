export interface VariantDefinition {
  id: string;
  name: string;
  props: Record<string, any>;
}

export class VariantEngine {
  private variants: Map<string, VariantDefinition[]> = new Map();

  registerVariants(blockId: string, list: VariantDefinition[]) {
    this.variants.set(blockId, list);
  }

  getVariants(blockId: string): VariantDefinition[] {
    return this.variants.get(blockId) || [];
  }

  applyVariant(blockId: string, variantId: string, currentProps: Record<string, any>): Record<string, any> {
    const list = this.getVariants(blockId);
    const variant = list.find((v) => v.id === variantId);
    if (!variant) return currentProps;
    return { ...currentProps, ...variant.props };
  }
}
