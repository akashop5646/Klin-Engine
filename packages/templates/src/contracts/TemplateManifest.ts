export interface TemplateManifest {
  id: string;
  name: string;
  version: string;
  category: string;
  author?: string;
  description?: string;
  preview?: string;
  thumbnail?: string;
  supportedPages?: string[];
  requiredBlocks?: string[];
  themeCompatibility?: string[];
  builderMetadata?: {
    movableSections?: boolean;
    deletableSections?: boolean;
  };
  tags?: string[];
}
