import type { PageDefinition } from "../core/PageDefinition";

export class BlockOverrideManager {
  private overrides: Record<string, Record<string, unknown>> = {};

  constructor(initialOverrides: Record<string, Record<string, unknown>> = {}) {
    this.overrides = JSON.parse(JSON.stringify(initialOverrides));
  }

  getOverrides(): Record<string, Record<string, unknown>> {
    return this.overrides;
  }

  getOverride(blockId: string): Record<string, unknown> | undefined {
    return this.overrides[blockId];
  }

  setOverride(blockId: string, diff: Record<string, unknown>) {
    this.overrides[blockId] = {
      ...(this.overrides[blockId] ?? {}),
      ...diff,
    };
  }

  removeOverride(blockId: string, propertyName?: string) {
    if (!propertyName) {
      delete this.overrides[blockId];
    } else if (this.overrides[blockId]) {
      delete this.overrides[blockId][propertyName];
      if (Object.keys(this.overrides[blockId]).length === 0) {
        delete this.overrides[blockId];
      }
    }
  }

  applyToPageDefinition(definition: PageDefinition) {
    definition.overrides = JSON.parse(JSON.stringify(this.overrides));
  }
}
