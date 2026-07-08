import { IDataProvider } from "../providers/IDataProvider";
import type { QueryBuilder } from "./QueryBuilder";
import { QueryResult } from "./QueryResult";
import { Entry } from "../entities/Entry";

export class QueryExecutor {
  private readonly _provider: IDataProvider;

  constructor(provider: IDataProvider) {
    this._provider = provider;
  }

  public async run(builder: QueryBuilder): Promise<QueryResult> {
    const startTime = Date.now();

    // Map filters to a generic queries config
    const queryPayload = {
      filters: builder.filters,
      sortField: builder.sortField,
      sortOrder: builder.sortOrder,
      limit: builder._limit,
      page: builder._page,
    };

    const raw = await this._provider.queryEntries(builder.collectionName, queryPayload);
    const items = raw.map((r) => new Entry(r));

    const totalCount = items.length; // Simplified for basic provider return
    const limitVal = builder._limit || totalCount;

    // Apply pagination and sorting if provider didn't natively do it (in-memory helper fallback)
    let processedItems = [...items];
    if (builder.sortField) {
      const field = builder.sortField;
      const order = builder.sortOrder === "asc" ? 1 : -1;
      processedItems.sort((a, b) => {
        const valA = a.values[field];
        const valB = b.values[field];
        if (valA < valB) return -1 * order;
        if (valA > valB) return 1 * order;
        return 0;
      });
    }

    const startIdx = (builder._page - 1) * limitVal;
    processedItems = processedItems.slice(startIdx, startIdx + limitVal);

    return new QueryResult({
      items: processedItems,
      totalCount,
      executionTimeMs: Date.now() - startTime,
      page: builder._page,
      limit: builder._limit,
    });
  }
}
