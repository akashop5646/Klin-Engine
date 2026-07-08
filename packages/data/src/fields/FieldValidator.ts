import { Field, FieldDefinition } from "../entities/Field";

export class FieldValidator {
  public static validateField(def: FieldDefinition, value: any): { success: boolean; error?: string } {
    return Field.validate(def, value);
  }

  public static validateRecord(fields: FieldDefinition[], record: Record<string, any>): Record<string, string> {
    const errors: Record<string, string> = {};
    for (const field of fields) {
      const value = record[field.name];
      const result = this.validateField(field, value);
      if (!result.success && result.error) {
        errors[field.name] = result.error;
      }
    }
    return errors;
  }
}
