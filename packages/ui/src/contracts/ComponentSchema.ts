/**
 * Component Schema — builder-agnostic property schema.
 * Describes every editable property a component exposes.
 * Later mapped to Puck adapter fields.
 */

export type SchemaFieldType =
  | "string"
  | "number"
  | "boolean"
  | "select"
  | "color"
  | "icon"
  | "url"
  | "custom";

export interface SchemaField {
  /** Machine key */
  key: string;

  /** Human label */
  label: string;

  /** Field data type */
  type: SchemaFieldType;

  /** Default value */
  defaultValue: unknown;

  /** Whether this field is required */
  required: boolean;

  /** Allowed options (for select type) */
  options?: Array<{ label: string; value: string }>;

  /** Group this field belongs to in the builder panel */
  group?: string;

  /** Display order within group */
  order?: number;

  /** Description shown as tooltip */
  description?: string;

  /** Validation rules */
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface ComponentSchema {
  /** Component identifier this schema belongs to */
  componentId: string;

  /** Ordered list of editable fields */
  fields: SchemaField[];
}
