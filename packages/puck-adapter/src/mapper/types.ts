export type BuilderFieldType =
  | "text"
  | "textarea"
  | "select"
  | "number"
  | "boolean"
  | "color"
  | "slider"
  | "icon"
  | "image"
  | "link"
  | "repeater"
  | "object"
  | "array"
  | "responsive";

export interface BuilderValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

export interface BuilderUIHints {
  placeholder?: string;
  helpText?: string;
  group?: string;
  order?: number;
  hidden?: boolean;
}

export interface BuilderField {
  id: string;
  type: BuilderFieldType;
  label: string;
  defaultValue?: unknown;
  options?: Array<{ label: string; value: string }>;
  validation?: BuilderValidation;
  ui?: BuilderUIHints;
  // Support nested fields for object and repeater/array
  fields?: BuilderField[];
}

export interface BuilderSchema {
  componentId: string;
  name: string;
  description?: string;
  category?: string;
  fields: BuilderField[];
}
