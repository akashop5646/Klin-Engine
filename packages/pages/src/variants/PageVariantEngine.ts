import type { PageDefinition } from "../core/PageDefinition";

export interface PageVariant {
  id: string;
  name: string;
  weight: number; // For traffic allocation in A/B testing (e.g. 50 = 50%)
  localeOverrides?: Record<string, string>;
  regionalOverrides?: Record<string, string>;
  overrides: Record<string, Record<string, unknown>>; // Override overrides for this variant
}

export interface PageVariantDefinition {
  pageId: string;
  variants: PageVariant[];
}

export class PageVariantEngine {
  private variantMap: Map<string, PageVariant[]> = new Map();

  registerVariants(pageId: string, variants: PageVariant[]): void {
    this.variantMap.set(pageId, variants);
  }

  getVariants(pageId: string): PageVariant[] {
    return this.variantMap.get(pageId) ?? [];
  }

  selectVariant(pageId: string, context?: { locale?: string; region?: string; userBucket?: number }): PageVariant | null {
    const variants = this.getVariants(pageId);
    if (variants.length === 0) {
      return null;
    }

    // 1. Filter variants by locale/region matching
    if (context?.locale) {
      const localeMatch = variants.find(
        (v) => v.localeOverrides && Object.keys(v.localeOverrides).includes(context.locale!)
      );
      if (localeMatch) return localeMatch;
    }

    if (context?.region) {
      const regionMatch = variants.find(
        (v) => v.regionalOverrides && Object.keys(v.regionalOverrides).includes(context.region!)
      );
      if (regionMatch) return regionMatch;
    }

    // 2. Traffic allocation fallback (A/B testing)
    const bucket = context?.userBucket ?? Math.floor(Math.random() * 100);
    let cumulativeWeight = 0;
    
    for (const variant of variants) {
      cumulativeWeight += variant.weight;
      if (bucket < cumulativeWeight) {
        return variant;
      }
    }

    return variants[0];
  }

  applyVariantOverrides(baseDefinition: PageDefinition, variant: PageVariant): PageDefinition {
    const mergedOverrides = {
      ...baseDefinition.overrides,
    };

    for (const [blockId, blockDiff] of Object.entries(variant.overrides)) {
      mergedOverrides[blockId] = {
        ...(mergedOverrides[blockId] ?? {}),
        ...blockDiff,
      };
    }

    return {
      ...baseDefinition,
      overrides: mergedOverrides,
    };
  }
}
