import type { TemplateSchema } from "../contracts/TemplateSchema";
import type { TemplateManifest } from "../contracts/TemplateManifest";

export type PreviewViewport = "desktop" | "tablet" | "mobile";

export interface PreviewConfig {
  viewport: PreviewViewport;
  width: number;
  height: number;
  zoom: number;
  showGrid: boolean;
  showGuides: boolean;
  interactive: boolean;
}

export const PREVIEW_VIEWPORTS: Record<PreviewViewport, { width: number; height: number }> = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 },
};

export class TemplatePreview {
  private config: PreviewConfig;
  private activeTemplateId: string | null = null;

  constructor(initialViewport: PreviewViewport = "desktop") {
    const dimensions = PREVIEW_VIEWPORTS[initialViewport];
    this.config = {
      viewport: initialViewport,
      width: dimensions.width,
      height: dimensions.height,
      zoom: 1,
      showGrid: false,
      showGuides: true,
      interactive: true,
    };
  }

  setViewport(viewport: PreviewViewport) {
    const dimensions = PREVIEW_VIEWPORTS[viewport];
    this.config = {
      ...this.config,
      viewport,
      width: dimensions.width,
      height: dimensions.height,
    };
  }

  setZoom(zoom: number) {
    this.config.zoom = Math.max(0.25, Math.min(3, zoom));
  }

  toggleGrid() {
    this.config.showGrid = !this.config.showGrid;
  }

  toggleGuides() {
    this.config.showGuides = !this.config.showGuides;
  }

  setInteractive(interactive: boolean) {
    this.config.interactive = interactive;
  }

  getConfig(): Readonly<PreviewConfig> {
    return { ...this.config };
  }

  activate(templateId: string) {
    this.activeTemplateId = templateId;
  }

  deactivate() {
    this.activeTemplateId = null;
  }

  getActiveTemplateId(): string | null {
    return this.activeTemplateId;
  }

  generatePreviewData(
    manifest: TemplateManifest,
    schema: TemplateSchema
  ): PreviewSnapshot {
    return {
      templateId: manifest.id,
      templateName: manifest.name,
      sectionCount: schema.sections.length,
      viewport: this.config.viewport,
      dimensions: { width: this.config.width, height: this.config.height },
      zoom: this.config.zoom,
      timestamp: Date.now(),
    };
  }
}

export interface PreviewSnapshot {
  templateId: string;
  templateName: string;
  sectionCount: number;
  viewport: PreviewViewport;
  dimensions: { width: number; height: number };
  zoom: number;
  timestamp: number;
}
