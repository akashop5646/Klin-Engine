import type { PageDefinition } from "../core/PageDefinition";

export interface PageIndexEntry {
  pageId: string;
  slug: string;
  route: string;
  title: string;
  tags: string[];
  category: string;
  searchText: string;
}

export class PageIndex {
  private index: Map<string, PageIndexEntry> = new Map();

  indexPage(definition: PageDefinition): void {
    const tags = definition.manifest.tags ?? [];
    const category = definition.manifest.category ?? "General";
    const slug = definition.manifest.slug;
    const route = definition.route.url;
    const title = definition.manifest.title;

    // Concat all search text fields for keyword search
    const searchText = [
      title.toLowerCase(),
      slug.toLowerCase(),
      route.toLowerCase(),
      category.toLowerCase(),
      ...tags.map((t) => t.toLowerCase()),
    ].join(" ");

    this.index.set(definition.manifest.id, {
      pageId: definition.manifest.id,
      slug,
      route,
      title,
      tags,
      category,
      searchText,
    });
  }

  deindexPage(pageId: string): void {
    this.index.delete(pageId);
  }

  getEntry(pageId: string): PageIndexEntry | undefined {
    return this.index.get(pageId);
  }

  getEntries(): PageIndexEntry[] {
    return Array.from(this.index.values());
  }
}
