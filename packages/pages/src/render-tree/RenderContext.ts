export interface RenderContext {
  locale: string;
  themeId: string;
  viewport: {
    width: number;
    height: number;
    type: "desktop" | "laptop" | "tablet" | "mobile" | "custom";
  };
  globalSettings?: Record<string, unknown>;
}
