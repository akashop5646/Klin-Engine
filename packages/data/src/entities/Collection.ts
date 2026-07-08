import { FieldDefinition } from "./Field";

export interface CollectionConfig {
  name: string;
  label: string;
  description?: string;
  fields: FieldDefinition[];
  indexes?: string[];
  version?: number;
}

export class Collection {
  public readonly name: string;
  public readonly label: string;
  public readonly description?: string;
  public readonly fields: FieldDefinition[];
  public readonly indexes: string[];
  public version: number;

  constructor(config: CollectionConfig) {
    this.name = config.name;
    this.label = config.label;
    this.description = config.description;
    this.fields = config.fields;
    this.indexes = config.indexes || [];
    this.version = config.version || 1;
  }

  public getField(fieldName: string): FieldDefinition | undefined {
    return this.fields.find((f) => f.name === fieldName);
  }
}
