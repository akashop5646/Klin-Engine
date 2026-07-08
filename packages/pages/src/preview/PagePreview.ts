import type { PageDefinition } from "../core/PageDefinition";

export type PagePreviewViewport = "desktop" | "tablet" | "mobile" | "print";

export interface PagePreviewConfig {
  viewport: PagePreviewViewport;
  width: number;
  height: number;
  zoom: number;
  showGrid: boolean;
  showGuides: boolean;
  darkMode: boolean;
  highContrast: boolean;
}

export const PREVIEW_VIEWPORTS_MAP: Record<PagePreviewViewport, { width: number; height: number }> = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 },
  print: { width: 800, height: 1100 },
};

export class PagePreview {
  private config: PagePreviewConfig;
  private activePageId: string | null = null;

  constructor(initialViewport: PagePreviewViewport = "desktop") {
    const dims = PREVIEW_VIEWPORTS_MAP[initialViewport];
    this.config = {
      viewport: initialViewport,
      width: dims.width,
      height: dims.height,
      zoom: 1,
      showGrid: false,
      showGuides: true,
      darkMode: false,
      highContrast: false,
    };
  }

  setViewport(viewport: PagePreviewViewport) {
    const dims = PREVIEW_VIEWPORTS_MAP[viewport];
    this.config = {
      ...this.config,
      viewport,
      width: dims.width,
      height: dims.height,
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

  setDarkMode(darkMode: boolean) {
    this.config.darkMode = darkMode;
  }

  setHighContrast(highContrast: boolean) {
    this.config.highContrast = highContrast;
  }

  getConfig(): Readonly<PagePreviewConfig> {
    return { ...this.config };
  }

  activate(pageId: string) {
    this.activePageId = pageId;
  }

  deactivate() {
    this.activePageId = null;
  }

  getActivePageId(): string | null {
    return this.activePageId;
  }

  generatePreviewSnapshot(definition: PageDefinition): Record<string, unknown> {
    return {
      pageId: definition.manifest.id,
      title: definition.manifest.title,
      route: definition.route.url,
      config: { ...this.config },
      timestamp: Date.now(),
    };
  }
}
