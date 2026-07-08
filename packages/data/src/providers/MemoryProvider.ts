import { IDataProvider } from "./IDataProvider";

export class MemoryProvider implements IDataProvider {
  private _collections: Map<string, any[]> = new Map();
  private _schemas: Map<string, any> = new Map();

  public async connect(): Promise<void> {
    // In-memory does not need connection setup
  }

  public async disconnect(): Promise<void> {
    // In-memory cleanup
    this._collections.clear();
    this._schemas.clear();
  }

  public async createCollection(name: string, schema: any): Promise<void> {
    this._schemas.set(name, schema);
    if (!this._collections.has(name)) {
      this._collections.set(name, []);
    }
  }

  public async deleteCollection(name: string): Promise<void> {
    this._schemas.delete(name);
    this._collections.delete(name);
  }

  public async createEntry(collectionName: string, data: any): Promise<any> {
    const list = this._collections.get(collectionName) || [];
    list.push(data);
    this._collections.set(collectionName, list);
    return data;
  }

  public async updateEntry(collectionName: string, id: string, data: any): Promise<any> {
    const list = this._collections.get(collectionName) || [];
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...data };
      this._collections.set(collectionName, list);
      return list[index];
    }
    throw new Error(`Entry ${id} not found in collection ${collectionName}`);
  }

  public async deleteEntry(collectionName: string, id: string): Promise<void> {
    const list = this._collections.get(collectionName) || [];
    const filtered = list.filter((item) => item.id !== id);
    this._collections.set(collectionName, filtered);
  }

  public async getEntry(collectionName: string, id: string): Promise<any> {
    const list = this._collections.get(collectionName) || [];
    return list.find((item) => item.id === id) || null;
  }

  public async queryEntries(collectionName: string, query: any): Promise<any[]> {
    const list = this._collections.get(collectionName) || [];
    
    // Fallback: apply basic filters on matches
    let results = [...list];
    if (query && Array.isArray(query.filters)) {
      query.filters.forEach((f: any) => {
        results = results.filter((item) => {
          const val = item.values ? item.values[f.field] : item[f.field];
          if (f.operator === "eq") return val === f.value;
          if (f.operator === "ne") return val !== f.value;
          if (f.operator === "contains") {
            return typeof val === "string" && val.includes(f.value);
          }
          return true;
        });
      });
    }
    return results;
  }

  public async executeTransaction(ops: any[]): Promise<void> {
    // For simplicity in memory, run them sequentially
    for (const op of ops) {
      if (op.type === "create") {
        await this.createEntry(op.collection, op.data);
      } else if (op.type === "update") {
        await this.updateEntry(op.collection, op.id, op.data);
      } else if (op.type === "delete") {
        await this.deleteEntry(op.collection, op.id);
      }
    }
  }
}
