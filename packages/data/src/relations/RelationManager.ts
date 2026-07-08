import { Entry } from "../entities/Entry";
import { ReferenceField } from "./ReferenceField";

export class RelationManager {
  private _relations: Map<string, ReferenceField[]> = new Map();

  public registerRelation(collectionName: string, field: ReferenceField): void {
    if (!this._relations.has(collectionName)) {
      this._relations.set(collectionName, []);
    }
    this._relations.get(collectionName)!.push(field);
  }

  public getRelationsFor(collectionName: string): ReferenceField[] {
    return this._relations.get(collectionName) || [];
  }

  public validateRelationConstraints(entry: Entry): { success: boolean; error?: string } {
    const fields = this.getRelationsFor(entry.collectionName);
    for (const field of fields) {
      const val = entry.values[field.name];
      if (field.required && !val) {
        return { success: false, error: `Relation reference field '${field.name}' is required` };
      }
    }
    return { success: true };
  }
}
