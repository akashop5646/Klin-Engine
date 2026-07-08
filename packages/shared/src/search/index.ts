export interface SearchOptions {
  query: string;
  keys?: string[];
  threshold?: number;
}

export function filterByQuery<T>(list: T[], options: SearchOptions): T[] {
  const query = options.query.toLowerCase().trim();
  if (!query) return list;

  const keys = options.keys || ["name", "title"];

  return list.filter((item: any) => {
    return keys.some((key) => {
      const val = item[key];
      if (typeof val === "string") {
        return val.toLowerCase().includes(query);
      }
      return false;
    });
  });
}
