export interface SearchQuery {
  term?: string;
  type?: string;
  tags?: string[];
}

export class SearchEngine {
  search<T extends { id: string; name: string; type?: string; tags?: string[] }>(
    items: T[],
    query: SearchQuery
  ): T[] {
    return items.filter((item) => {
      if (query.type && item.type !== query.type) return false;
      if (query.term) {
        const lower = query.term.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(lower);
        const matchesName = item.name.toLowerCase().includes(lower);
        if (!matchesId && !matchesName) return false;
      }
      if (query.tags && query.tags.length > 0) {
        if (!item.tags) return false;
        const hasAllTags = query.tags.every((t) => item.tags!.includes(t));
        if (!hasAllTags) return false;
      }
      return true;
    });
  }
}
