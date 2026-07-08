import { IDataProvider } from "./IDataProvider";
import { MongoClient, Db } from "mongodb";

export class MongoProvider implements IDataProvider {
  private _uri: string;
  private _client?: MongoClient;
  private _db?: Db;
  private _dbName: string;

  constructor(uri?: string, dbName: string = "Kiln") {
    this._uri = uri || (typeof process !== "undefined" ? process.env.MONGODB_URI : undefined) || "mongodb://localhost:27017";
    this._dbName = dbName;
  }

  public async connect(): Promise<void> {
    if (this._client) return;
    this._client = await MongoClient.connect(this._uri);
    this._db = this._client.db(this._dbName);
  }

  public async disconnect(): Promise<void> {
    if (this._client) {
      await this._client.close();
      this._client = undefined;
      this._db = undefined;
    }
  }

  public async createCollection(name: string, schema: any): Promise<void> {
    if (!this._db) throw new Error("Database not connected");
    // Ensure collection exists
    const cols = await this._db.listCollections({ name }).toArray();
    if (cols.length === 0) {
      await this._db.createCollection(name);
    }
  }

  public async deleteCollection(name: string): Promise<void> {
    if (!this._db) throw new Error("Database not connected");
    await this._db.collection(name).drop().catch(() => {});
  }

  public async createEntry(collectionName: string, data: any): Promise<any> {
    if (!this._db) throw new Error("Database not connected");
    const doc = { _id: data.id, ...data };
    await this._db.collection(collectionName).insertOne(doc);
    return data;
  }

  public async updateEntry(collectionName: string, id: string, data: any): Promise<any> {
    if (!this._db) throw new Error("Database not connected");
    const doc = { ...data };
    delete doc.id;
    await this._db.collection(collectionName).updateOne({ _id: id as any }, { $set: doc });
    return { id, ...doc };
  }

  public async deleteEntry(collectionName: string, id: string): Promise<void> {
    if (!this._db) throw new Error("Database not connected");
    await this._db.collection(collectionName).deleteOne({ _id: id as any });
  }

  public async getEntry(collectionName: string, id: string): Promise<any> {
    if (!this._db) throw new Error("Database not connected");
    const raw = await this._db.collection(collectionName).findOne({ _id: id as any });
    if (!raw) return null;
    const { _id, ...rest } = raw;
    return { id: _id, ...rest };
  }

  public async queryEntries(collectionName: string, query: any): Promise<any[]> {
    if (!this._db) throw new Error("Database not connected");
    const mongoQuery: Record<string, any> = {};

    if (query && Array.isArray(query.filters)) {
      query.filters.forEach((f: any) => {
        const fieldKey = `values.${f.field}`;
        if (f.operator === "eq") {
          mongoQuery[fieldKey] = f.value;
        } else if (f.operator === "ne") {
          mongoQuery[fieldKey] = { $ne: f.value };
        } else if (f.operator === "contains") {
          mongoQuery[fieldKey] = { $regex: f.value, $options: "i" };
        }
      });
    }

    const cursor = this._db.collection(collectionName).find(mongoQuery);
    
    if (query && query.sortField) {
      cursor.sort(`values.${query.sortField}`, query.sortOrder === "asc" ? 1 : -1);
    }

    if (query && query.limit) {
      const page = query.page || 1;
      cursor.skip((page - 1) * query.limit).limit(query.limit);
    }

    const docs = await cursor.toArray();
    return docs.map((doc: any) => {
      const { _id, ...rest } = doc;
      return { id: _id, ...rest };
    });
  }

  public async executeTransaction(ops: any[]): Promise<void> {
    if (!this._client) throw new Error("Database not connected");
    const session = this._client.startSession();
    try {
      await session.withTransaction(async () => {
        for (const op of ops) {
          const col = this._db!.collection(op.collection);
          if (op.type === "create") {
            await col.insertOne({ _id: op.data.id as any, ...op.data }, { session });
          } else if (op.type === "update") {
            const doc = { ...op.data };
            delete doc.id;
            await col.updateOne({ _id: op.id as any }, { $set: doc }, { session });
          } else if (op.type === "delete") {
            await col.deleteOne({ _id: op.id as any }, { session });
          }
        }
      });
    } finally {
      await session.endSession();
    }
  }
}
