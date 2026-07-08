import { QueryBuilder } from "../query/QueryBuilder";
import { QueryExecutor } from "../query/QueryExecutor";
import { DataContext } from "../core/DataContext";
import { QueryResult } from "../query/QueryResult";

export class QueryAPI {
  private readonly _context: DataContext;
  private readonly _executor: QueryExecutor;

  constructor(context: DataContext) {
    this._context = context;
    this._executor = new QueryExecutor(this._context.provider);
  }

  public builder(collectionName: string): QueryBuilder {
    return new QueryBuilder(collectionName, this._executor);
  }

  public async query(collectionName: string, filters: any[] = []): Promise<QueryResult> {
    const qb = this.builder(collectionName);
    filters.forEach((f) => {
      qb.where(f.field, f.operator, f.value);
    });
    return qb.execute();
  }
}
