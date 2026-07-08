import { FieldType } from "../entities/Field";

export class FieldRegistry {
  private static _instance: FieldRegistry;
  private _registeredTypes: Set<FieldType> = new Set();

  private constructor() {
    this.registerDefaults();
  }

  public static getInstance(): FieldRegistry {
    if (!FieldRegistry._instance) {
      FieldRegistry._instance = new FieldRegistry();
    }
    return FieldRegistry._instance;
  }

  public register(type: FieldType): void {
    this._registeredTypes.add(type);
  }

  public isRegistered(type: FieldType): boolean {
    return this._registeredTypes.has(type);
  }

  public getRegisteredTypes(): FieldType[] {
    return Array.from(this._registeredTypes);
  }

  private registerDefaults(): void {
    const defaults: FieldType[] = [
      "Text",
      "Textarea",
      "RichText",
      "Markdown",
      "Boolean",
      "Number",
      "Color",
      "Date",
      "Time",
      "Slug",
      "Email",
      "Phone",
      "Password",
      "Image",
      "Video",
      "Gallery",
      "Reference",
      "Repeater",
      "Object",
      "JSON",
      "Code",
      "URL",
      "Rating",
      "Money",
      "Formula",
    ];
    defaults.forEach((t) => this.register(t));
  }
}
