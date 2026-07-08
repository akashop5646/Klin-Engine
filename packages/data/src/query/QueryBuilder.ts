import type { QueryExecutor } from "./QueryExecutor";
import { QueryResult } from "./QueryResult";

export interface QueryFilter {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains";
  value: any;
}

export class QueryBuilder {
  public readonly collectionName: string;
  public filters: QueryFilter[] = [];
  public sortField?: string;
  public sortOrder: "asc" | "desc" = "asc";
  public _limit?: number;
  public _page: number = 1;
  private readonly _executor: QueryExecutor;

  constructor(collectionName: string, executor: QueryExecutor) {
    this.collectionName = collectionName;
    this._executor = executor;
  }

  public where(field: string, operator: QueryFilter["operator"], value: any): this {
    this.filters.push({ field, operator, value });
    return this;
  }

  public sort(field: string, order: "asc" | "desc" = "asc"): this {
    this.sortField = field;
    this.sortOrder = order;
    return this;
  }

  public limit(num: number): this {
    this._limit = num;
    return this;
  }

  public page(num: number): this {
    this._page = num;
    return this;
  }

  public async execute(): Promise<QueryResult> {
    return this._executor.run(this);
  }
}
