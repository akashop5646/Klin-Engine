export interface BlockManifest {
  id: string;
  name: string;
  version: string;
  author?: string;
  category: string;
  subcategory?: string;
  tags?: string[];
  icon?: string;
  preview?: string;
  dependencies?: Record<string, string>;
  supportedPages?: string[];
  supportedTemplates?: string[];
  requiredComponents?: string[];
  compatibility?: Record<string, string>;
  builderMetadata?: {
    editableRegions?: string[];
    movable?: boolean;
    deletable?: boolean;
    duplicatable?: boolean;
    nestable?: boolean;
  };
}
