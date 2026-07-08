import type { PageIndex, PageIndexEntry } from "./PageIndex";

export interface SearchFilter {
  category?: string;
  tag?: string;
  favoritesOnly?: boolean;
}

export interface SearchOptions {
  query?: string;
  filter?: SearchFilter;
  sortBy?: "title" | "route" | "recent";
  sortOrder?: "asc" | "desc";
  favorites?: string[]; // Array of pageIds
}

export class PageSearch {
  private pageIndex: PageIndex;

  constructor(pageIndex: PageIndex) {
    this.pageIndex = pageIndex;
  }

  search(options: SearchOptions): PageIndexEntry[] {
    let results = this.pageIndex.getEntries();

    // 1. Keyword query match
    if (options.query) {
      const q = options.query.toLowerCase();
      results = results.filter((entry) => entry.searchText.includes(q));
    }

    // 2. Filter match
    if (options.filter) {
      const { category, tag, favoritesOnly } = options.filter;

      if (category) {
        results = results.filter((entry) => entry.category === category);
      }

      if (tag) {
        results = results.filter((entry) => entry.tags.includes(tag));
      }

      if (favoritesOnly && options.favorites) {
        results = results.filter((entry) =>
          options.favorites!.includes(entry.pageId)
        );
      }
    }

    // 3. Sorting
    const sortBy = options.sortBy ?? "title";
    const sortOrder = options.sortOrder ?? "asc";

    results.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "route") {
        comparison = a.route.localeCompare(b.route);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return results;
  }
}
