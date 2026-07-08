import { Entry } from "../entities/Entry";
import { Collection } from "../entities/Collection";
import { FieldValidator } from "../fields/FieldValidator";

export class ValidationPipeline {
  public static validate(entry: Entry, collection: Collection): { success: boolean; errors?: Record<string, string> } {
    const errors = FieldValidator.validateRecord(collection.fields, entry.values);
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }
    return { success: true };
  }
}
