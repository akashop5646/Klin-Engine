export interface TemplateSchema {
  id: string;
  name: string;
  sections: Array<{
    id: string;
    blockId: string;
    properties: Record<string, any>;
  }>;
  responsiveSettings?: {
    mobileBreakpoint?: number;
    tabletBreakpoint?: number;
  };
}
