import type { PageDefinition } from "./PageDefinition";
import type { PageInstance } from "./PageFactory";
import { Result, Ok, Err } from "@klin/core";

export interface PageDraft {
  pageId: string;
  definition: PageDefinition;
  updatedAt: number;
}

export class DraftManager {
  private drafts: Map<string, PageDraft> = new Map();

  autosave(pageId: string, definition: PageDefinition): void {
    this.drafts.set(pageId, {
      pageId,
      definition: JSON.parse(JSON.stringify(definition)),
      updatedAt: Date.now(),
    });
  }

  getDraft(pageId: string): PageDraft | undefined {
    return this.drafts.get(pageId);
  }

  discardDraft(pageId: string): void {
    this.drafts.delete(pageId);
  }

  restoreDraft(instance: PageInstance): Result<void, Error> {
    const draft = this.getDraft(instance.definition.manifest.id);
    if (!draft) {
      return new Err(new Error(`No draft found for page: ${instance.definition.manifest.id}`));
    }
    
    // Merge overrides back into active page definitions
    instance.updateState({
      isDirty: true,
    });
    
    // Re-assign override definitions in-place
    Object.assign(instance.definition.overrides, draft.definition.overrides);
    Object.assign(instance.definition.seo, draft.definition.seo);
    Object.assign(instance.definition.route, draft.definition.route);
    
    return new Ok(undefined);
  }

  compareDraftWithPublished(
    published: PageDefinition,
    draft: PageDefinition
  ): Record<string, unknown> {
    const differences: Record<string, unknown> = {};

    // 1. Compare SEO title and description
    if (published.seo.title !== draft.seo.title) {
      differences["seo.title"] = { published: published.seo.title, draft: draft.seo.title };
    }
    if (published.seo.description !== draft.seo.description) {
      differences["seo.description"] = { published: published.seo.description, draft: draft.seo.description };
    }

    // 2. Compare overrides count
    const publishedOverrideKeys = Object.keys(published.overrides);
    const draftOverrideKeys = Object.keys(draft.overrides);
    
    if (publishedOverrideKeys.length !== draftOverrideKeys.length) {
      differences["overrides.count"] = { published: publishedOverrideKeys.length, draft: draftOverrideKeys.length };
    }

    return differences;
  }
}
