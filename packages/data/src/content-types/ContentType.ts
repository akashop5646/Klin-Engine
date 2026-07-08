import { FieldDefinition } from "../entities/Field";

export interface ContentTypeConfig {
  slug: string;
  name: string;
  fields: FieldDefinition[];
}

export class ContentType {
  public readonly slug: string;
  public readonly name: string;
  public readonly fields: FieldDefinition[];

  constructor(config: ContentTypeConfig) {
    this.slug = config.slug;
    this.name = config.name;
    this.fields = config.fields;
  }
}
