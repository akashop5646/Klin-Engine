export interface IDataProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  createCollection(name: string, schema: any): Promise<void>;
  deleteCollection(name: string): Promise<void>;
  createEntry(collectionName: string, data: any): Promise<any>;
  updateEntry(collectionName: string, id: string, data: any): Promise<any>;
  deleteEntry(collectionName: string, id: string): Promise<void>;
  getEntry(collectionName: string, id: string): Promise<any>;
  queryEntries(collectionName: string, query: any): Promise<any[]>;
  executeTransaction(ops: any[]): Promise<void>;
}
