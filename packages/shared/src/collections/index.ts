export function groupBy<T>(list: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return list.reduce((acc, item) => {
    const k = keyFn(item);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function keyBy<T>(list: T[], keyFn: (item: T) => string): Record<string, T> {
  return list.reduce((acc, item) => {
    acc[keyFn(item)] = item;
    return acc;
  }, {} as Record<string, T>);
}

export function chunk<T>(list: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    result.push(list.slice(i, i + size));
  }
  return result;
}

export function unique<T>(list: T[]): T[] {
  return Array.from(new Set(list));
}

export function flatten<T>(list: T[][]): T[] {
  return list.reduce((acc, val) => acc.concat(val), []);
}

export function sortBy<T>(list: T[], keyFn: (item: T) => any, direction: "asc" | "desc" = "asc"): T[] {
  return [...list].sort((a, b) => {
    const ka = keyFn(a);
    const kb = keyFn(b);
    if (ka === kb) return 0;
    const factor = direction === "asc" ? 1 : -1;
    return ka > kb ? factor : -factor;
  });
}
