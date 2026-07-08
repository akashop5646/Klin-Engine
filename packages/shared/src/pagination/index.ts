export interface PageInfo {
  total: number;
  limit: number;
  offset: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function offset(page: number, limit: number): number {
  return Math.max(0, (page - 1) * limit);
}

export function pageInfo(total: number, limit: number, offset: number): PageInfo {
  return {
    total,
    limit,
    offset,
    hasNextPage: offset + limit < total,
    hasPreviousPage: offset > 0,
  };
}
