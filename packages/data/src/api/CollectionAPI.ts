import { Collection, CollectionConfig } from "../entities/Collection";
import { DataContext } from "../core/DataContext";

export class CollectionAPI {
  private readonly _context: DataContext;

  constructor(context: DataContext) {
    this._context = context;
  }

  public async create(config: CollectionConfig): Promise<Collection> {
    const col = new Collection(config);
    await this._context.provider.createCollection(col.name, {
      label: col.label,
      description: col.description,
      fields: col.fields,
      indexes: col.indexes,
      version: col.version,
    });
    return col;
  }

  public async delete(name: string): Promise<void> {
    await this._context.provider.deleteCollection(name);
  }
}
