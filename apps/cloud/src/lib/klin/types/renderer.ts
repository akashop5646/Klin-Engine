import { DesignState, ComponentInstance } from "./templates";

export interface RendererOptions {
  ssr: boolean;
  hydrate: boolean;
  isPreview?: boolean;
  activeSectionId?: string | null;
  onSectionClick?: (sectionId: string) => void;
}

export interface AstNode {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: AstNode[];
}

export interface RenderingContext {
  designState: DesignState;
  activePageId: string;
  options: RendererOptions;
}
