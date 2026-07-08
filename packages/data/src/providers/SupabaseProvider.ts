import { IDataProvider } from "./IDataProvider";

export class SupabaseProvider implements IDataProvider {
  public async connect(): Promise<void> {}
  public async disconnect(): Promise<void> {}
  public async createCollection(name: string, schema: any): Promise<void> {}
  public async deleteCollection(name: string): Promise<void> {}
  public async createEntry(collectionName: string, data: any): Promise<any> { return data; }
  public async updateEntry(collectionName: string, id: string, data: any): Promise<any> { return data; }
  public async deleteEntry(collectionName: string, id: string): Promise<void> {}
  public async getEntry(collectionName: string, id: string): Promise<any> { return null; }
  public async queryEntries(collectionName: string, query: any): Promise<any[]> { return []; }
  public async executeTransaction(ops: any[]): Promise<void> {}
}
