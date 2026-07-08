export interface RendererOptions {
  hydrate: boolean;
  minify: boolean;
  debug: boolean;
  optimizeAssets: boolean;
  strictAccessibility: boolean;
  customParameters?: Record<string, unknown>;
}
