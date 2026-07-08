export interface ReferenceFieldConfig {
  name: string;
  targetCollection: string;
  relationType: "OneToOne" | "OneToMany" | "ManyToMany";
  required?: boolean;
}

export class ReferenceField {
  public readonly name: string;
  public readonly targetCollection: string;
  public readonly relationType: "OneToOne" | "OneToMany" | "ManyToMany";
  public readonly required: boolean;

  constructor(config: ReferenceFieldConfig) {
    this.name = config.name;
    this.targetCollection = config.targetCollection;
    this.relationType = config.relationType;
    this.required = config.required || false;
  }
}
