import { DataContext } from "./DataContext";
import { Collection, CollectionConfig } from "../entities/Collection";
import { Entry, EntryConfig } from "../entities/Entry";
import { QueryBuilder } from "../query/QueryBuilder";
import { QueryExecutor } from "../query/QueryExecutor";
import { BindingEngine } from "../binding/BindingEngine";

export class DataManager {
  private readonly _context: DataContext;
  private readonly _bindingEngine: BindingEngine;
  private readonly _queryExecutor: QueryExecutor;

  constructor(context: DataContext, bindingEngine: BindingEngine) {
    this._context = context;
    this._bindingEngine = bindingEngine;
    this._queryExecutor = new QueryExecutor(context.provider);
  }

  public async createCollection(config: CollectionConfig): Promise<Collection> {
    const col = new Collection(config);
    await this._context.provider.createCollection(col.name, col);
    return col;
  }

  public async createEntry(collectionName: string, config: EntryConfig): Promise<Entry> {
    const entry = new Entry(config);
    await this._context.provider.createEntry(collectionName, {
      id: entry.id,
      collectionName: entry.collectionName,
      status: entry.status,
      values: entry.values,
      localizations: entry.localizations,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    });
    return entry;
  }

  public query(collectionName: string): QueryBuilder {
    return new QueryBuilder(collectionName, this._queryExecutor);
  }

  public getBindingEngine(): BindingEngine {
    return this._bindingEngine;
  }
}
