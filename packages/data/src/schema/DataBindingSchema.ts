import { FieldType } from "../entities/Field";

export interface PropertyBindingConfig {
  bindingAllowed: boolean;
  allowedCollections?: string[];
  allowedFieldTypes?: FieldType[];
  defaultValue?: any;
}

export class DataBindingSchema {
  public static createBindingSchema(
    allowedCollections: string[],
    allowedFieldTypes: FieldType[],
    defaultValue?: any
  ): PropertyBindingConfig {
    return {
      bindingAllowed: true,
      allowedCollections,
      allowedFieldTypes,
      defaultValue,
    };
  }
}
