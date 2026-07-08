export interface BlockSchemaProperty {
  type: "string" | "number" | "boolean" | "object" | "array" | "select" | "color" | "image";
  label: string;
  defaultValue: any;
  options?: Array<{ label: string; value: any }>;
  group?: string;
  responsive?: boolean;
}

export interface BlockSchema {
  properties: Record<string, BlockSchemaProperty>;
}
