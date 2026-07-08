import { Entry } from "../entities/Entry";

export class DataSerializer {
  public static serialize(entries: Entry[]): string {
    return JSON.stringify(
      entries.map((e) => ({
        id: e.id,
        collectionName: e.collectionName,
        status: e.status,
        values: e.values,
        localizations: e.localizations,
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString(),
      }))
    );
  }

  public static deserialize(jsonStr: string): Entry[] {
    const raw = JSON.parse(jsonStr);
    const list = Array.isArray(raw) ? raw : [raw];
    return list.map(
      (item: any) =>
        new Entry({
          id: item.id,
          collectionName: item.collectionName,
          status: item.status,
          values: item.values,
          localizations: item.localizations,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        })
    );
  }
}
