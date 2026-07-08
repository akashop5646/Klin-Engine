export type SortDirection = "asc" | "desc";

export function ascending<T>(a: T, b: T): number {
  if (a === b) return 0;
  return a > b ? 1 : -1;
}

export function descending<T>(a: T, b: T): number {
  if (a === b) return 0;
  return a < b ? 1 : -1;
}
