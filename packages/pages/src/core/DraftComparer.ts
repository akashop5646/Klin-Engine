import type { PageDefinition } from "./PageDefinition";
import { Result, Ok, Err } from "@klin/core";

export interface DiffItem {
  path: string;
  type: "addition" | "deletion" | "modification";
  oldValue?: unknown;
  newValue?: unknown;
}

export class DraftComparer {
  compare(published: PageDefinition, draft: PageDefinition): boolean {
    const diffs = this.generateDiff(published, draft);
    return diffs.length > 0;
  }

  generateDiff(published: PageDefinition, draft: PageDefinition): DiffItem[] {
    const diffs: DiffItem[] = [];

    // Compare SEO values
    if (published.seo.title !== draft.seo.title) {
      diffs.push({
        path: "seo.title",
        type: "modification",
        oldValue: published.seo.title,
        newValue: draft.seo.title,
      });
    }
    if (published.seo.description !== draft.seo.description) {
      diffs.push({
        path: "seo.description",
        type: "modification",
        oldValue: published.seo.description,
        newValue: draft.seo.description,
      });
    }

    // Compare Block Overrides
    const publishedKeys = Object.keys(published.overrides);
    const draftKeys = Object.keys(draft.overrides);

    // Added overrides
    for (const key of draftKeys) {
      if (!published.overrides[key]) {
        diffs.push({
          path: `overrides.${key}`,
          type: "addition",
          newValue: draft.overrides[key],
        });
      } else {
        // Compare values
        const pVal = JSON.stringify(published.overrides[key]);
        const dVal = JSON.stringify(draft.overrides[key]);
        if (pVal !== dVal) {
          diffs.push({
            path: `overrides.${key}`,
            type: "modification",
            oldValue: published.overrides[key],
            newValue: draft.overrides[key],
          });
        }
      }
    }

    // Deleted overrides
    for (const key of publishedKeys) {
      if (!draft.overrides[key]) {
        diffs.push({
          path: `overrides.${key}`,
          type: "deletion",
          oldValue: published.overrides[key],
        });
      }
    }

    return diffs;
  }

  restoreSection(target: PageDefinition, source: PageDefinition, sectionId: string): Result<void, Error> {
    const sectionOverrides: Record<string, unknown> = {};
    
    // Find overrides related to this section
    for (const [key, value] of Object.entries(source.overrides)) {
      if (key === sectionId || key.startsWith(`${sectionId}.`)) {
        sectionOverrides[key] = JSON.parse(JSON.stringify(value));
      }
    }

    // Clear target overrides for this section and apply from source
    for (const key of Object.keys(target.overrides)) {
      if (key === sectionId || key.startsWith(`${sectionId}.`)) {
        delete target.overrides[key];
      }
    }

    Object.assign(target.overrides, sectionOverrides);
    return new Ok(undefined);
  }

  restoreBlock(target: PageDefinition, source: PageDefinition, blockId: string): Result<void, Error> {
    const blockOverride = source.overrides[blockId];
    if (!blockOverride) {
      delete target.overrides[blockId];
    } else {
      target.overrides[blockId] = JSON.parse(JSON.stringify(blockOverride));
    }
    return new Ok(undefined);
  }

  restoreProperty(
    target: PageDefinition,
    source: PageDefinition,
    blockId: string,
    propertyName: string
  ): Result<void, Error> {
    const sourceOverride = source.overrides[blockId];
    const targetOverride = target.overrides[blockId];

    if (!sourceOverride || sourceOverride[propertyName] === undefined) {
      if (targetOverride) {
        delete targetOverride[propertyName];
        if (Object.keys(targetOverride).length === 0) {
          delete target.overrides[blockId];
        }
      }
    } else {
      if (!target.overrides[blockId]) {
        target.overrides[blockId] = {};
      }
      target.overrides[blockId][propertyName] = sourceOverride[propertyName];
    }

    return new Ok(undefined);
  }
}
