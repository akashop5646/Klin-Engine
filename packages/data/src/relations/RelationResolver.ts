import { Entry } from "../entities/Entry";
import { IDataProvider } from "../providers/IDataProvider";
import { ReferenceField } from "./ReferenceField";

export class RelationResolver {
  public static async resolve(
    entry: Entry,
    field: ReferenceField,
    provider: IDataProvider
  ): Promise<Entry | Entry[] | null> {
    const value = entry.values[field.name];
    if (!value) return null;

    if (field.relationType === "OneToOne" || field.relationType === "OneToMany") {
      if (Array.isArray(value)) {
        const entries: Entry[] = [];
        for (const id of value) {
          const raw = await provider.getEntry(field.targetCollection, id);
          if (raw) entries.push(new Entry(raw));
        }
        return entries;
      } else {
        const raw = await provider.getEntry(field.targetCollection, String(value));
        return raw ? new Entry(raw) : null;
      }
    } else {
      // ManyToMany
      const ids = Array.isArray(value) ? value : [value];
      const entries: Entry[] = [];
      for (const id of ids) {
        const raw = await provider.getEntry(field.targetCollection, id);
        if (raw) entries.push(new Entry(raw));
      }
      return entries;
    }
  }
}
