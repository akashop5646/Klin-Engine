import { Entry } from "../entities/Entry";

export interface QueryResultConfig {
  items: Entry[];
  totalCount: number;
  executionTimeMs?: number;
  page?: number;
  limit?: number;
}

export class QueryResult {
  public readonly items: Entry[];
  public readonly totalCount: number;
  public readonly executionTimeMs?: number;
  public readonly page?: number;
  public readonly limit?: number;

  constructor(config: QueryResultConfig) {
    this.items = config.items;
    this.totalCount = config.totalCount;
    this.executionTimeMs = config.executionTimeMs;
    this.page = config.page;
    this.limit = config.limit;
  }
}
