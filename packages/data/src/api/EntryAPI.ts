import { Entry, EntryConfig } from "../entities/Entry";
import { DataContext } from "../core/DataContext";

export class EntryAPI {
  private readonly _context: DataContext;

  constructor(context: DataContext) {
    this._context = context;
  }

  public async get(collectionName: string, id: string): Promise<Entry | null> {
    const raw = await this._context.provider.getEntry(collectionName, id);
    return raw ? new Entry(raw) : null;
  }

  public async create(collectionName: string, config: Partial<EntryConfig>): Promise<Entry> {
    const newId = config.id || Math.random().toString(36).substring(2, 9);
    const entry = new Entry({
      id: newId,
      collectionName,
      status: config.status || "Draft",
      values: config.values || {},
      localizations: config.localizations || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const payload = {
      id: entry.id,
      collectionName: entry.collectionName,
      status: entry.status,
      values: entry.values,
      localizations: entry.localizations,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    };

    await this._context.provider.createEntry(collectionName, payload);
    return entry;
  }

  public async update(collectionName: string, id: string, values: Record<string, any>): Promise<Entry> {
    const raw = await this._context.provider.getEntry(collectionName, id);
    if (!raw) throw new Error(`Entry ${id} not found in ${collectionName}`);

    const entry = new Entry(raw);
    entry.values = { ...entry.values, ...values };
    entry.updatedAt = new Date();

    const payload = {
      id: entry.id,
      collectionName: entry.collectionName,
      status: entry.status,
      values: entry.values,
      localizations: entry.localizations,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    };

    await this._context.provider.updateEntry(collectionName, id, payload);
    return entry;
  }

  public async delete(collectionName: string, id: string): Promise<void> {
    await this._context.provider.deleteEntry(collectionName, id);
  }
}
