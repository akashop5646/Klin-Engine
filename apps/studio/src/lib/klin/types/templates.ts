import { ThemeConfig } from "./theme";

export interface ComponentInstance {
  id: string;
  type: string;
  props: Record<string, any>;
  isVisible?: boolean;
}

export interface PageConfig {
  id: string;
  title: string;
  slug: string;
  isVisible: boolean;
  sections: ComponentInstance[];
}

export interface DesignState {
  _id?: string;
  templateId: string;
  theme: ThemeConfig;
  pages: PageConfig[];
  version: number;
  publishedAt: string | null;
}

export interface KlinTemplateMetadata {
  id: string;
  name: string;
  description: string;
  industry: string;
  category: string;
  primaryColors: string[];
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  animationPresets: string;
  responsiveRules: string[];
  themeTokens: string[];
  accessibilityScore: number;
  performanceOptimizations: string[];
}

export interface KlinTemplatePackage {
  metadata: KlinTemplateMetadata;
  template: DesignState;
  previewUrl?: string;
}
