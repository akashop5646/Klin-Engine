import type { TemplateSchema } from "../contracts/TemplateSchema";

export interface TemplateVariant {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  themeOverrides: Record<string, unknown>;
  sectionOverrides: Record<string, Record<string, unknown>>;
  tags?: string[];
}

export interface TemplateVariantDefinition {
  templateId: string;
  variants: TemplateVariant[];
  defaultVariantId: string;
}

export class TemplateVariantEngine {
  private definitions: Map<string, TemplateVariantDefinition> = new Map();
  private activeVariants: Map<string, string> = new Map();

  registerVariants(templateId: string, definition: TemplateVariantDefinition): void {
    this.definitions.set(templateId, definition);
    this.activeVariants.set(templateId, definition.defaultVariantId);
  }

  getVariant(templateId: string, variantId: string): TemplateVariant | undefined {
    const def = this.definitions.get(templateId);
    if (!def) return undefined;
    return def.variants.find((v) => v.id === variantId);
  }

  getActiveVariant(templateId: string): TemplateVariant | undefined {
    const activeId = this.activeVariants.get(templateId);
    if (!activeId) return undefined;
    return this.getVariant(templateId, activeId);
  }

  switchVariant(templateId: string, variantId: string): boolean {
    const def = this.definitions.get(templateId);
    if (!def) return false;
    const variant = def.variants.find((v) => v.id === variantId);
    if (!variant) return false;
    this.activeVariants.set(templateId, variantId);
    return true;
  }

  listVariants(templateId: string): TemplateVariant[] {
    const def = this.definitions.get(templateId);
    return def?.variants ?? [];
  }

  applyVariantOverrides(
    schema: TemplateSchema,
    templateId: string
  ): TemplateSchema {
    const variant = this.getActiveVariant(templateId);
    if (!variant) return schema;

    const overriddenSections = schema.sections.map((section) => {
      const sectionOverride = variant.sectionOverrides[section.id];
      if (!sectionOverride) return section;
      return {
        ...section,
        properties: { ...section.properties, ...sectionOverride },
      };
    });

    return { ...schema, sections: overriddenSections };
  }

  unregister(templateId: string) {
    this.definitions.delete(templateId);
    this.activeVariants.delete(templateId);
  }
}
