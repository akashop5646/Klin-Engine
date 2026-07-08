export type ComponentCategory =
  | "foundation"
  | "navigation"
  | "commerce"
  | "content"
  | "marketing"
  | "social";

export type FieldType =
  | "text"
  | "textarea"
  | "color"
  | "image"
  | "select"
  | "toggle"
  | "number"
  | "link"
  | "items";

export interface FieldOption {
  label: string;
  value: string | number | boolean;
}

export interface InspectorField {
  key: string;
  label: string;
  type: FieldType;
  tab: "content" | "style" | "layout" | "animation" | "seo" | "accessibility";
  options?: FieldOption[];
  placeholder?: string;
  group?: string;
  defaultValue?: any;
}

export interface PuckComponentSchema {
  fields: Record<string, InspectorField>;
  defaultProps: Record<string, any>;
  render: React.ComponentType<any>;
}

export interface KlinComponentManifest {
  id: string;
  name: string;
  category: string;
  version: string;
  variants: string[];
  editableProps: string[];
  supportsPuck: boolean;
  supportsAI: boolean;
  supportsMarketplace: boolean;
}

export interface KlinComponentDefinition {
  type: string;
  label: string;
  category: ComponentCategory;
  description: string;
  icon: string; // Lucide icon identifier
  schema: PuckComponentSchema;
  manifest: KlinComponentManifest;
  version: string;
  accessibilityNotes?: string;
}
