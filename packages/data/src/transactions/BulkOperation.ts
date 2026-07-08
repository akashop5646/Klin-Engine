import { IDataProvider } from "../providers/IDataProvider";

export class BulkOperation {
  public static async bulkUpdate(
    provider: IDataProvider,
    collectionName: string,
    ids: string[],
    data: Record<string, any>
  ): Promise<void> {
    const ops = ids.map((id) => ({
      type: "update" as const,
      collection: collectionName,
      id,
      data,
    }));
    await provider.executeTransaction(ops);
  }

  public static async bulkDelete(
    provider: IDataProvider,
    collectionName: string,
    ids: string[]
  ): Promise<void> {
    const ops = ids.map((id) => ({
      type: "delete" as const,
      collection: collectionName,
      id,
    }));
    await provider.executeTransaction(ops);
  }
}
