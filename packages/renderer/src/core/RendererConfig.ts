export interface RendererConfigOptions {
  rendering: {
    defaultLocale: string;
    enableStreaming: boolean;
  };
  hydration: {
    enableIslands: boolean;
    defaultStrategy: string;
  };
  cache: {
    enableCache: boolean;
    ttlMs: number;
  };
  performance: {
    enableScheduler: boolean;
    enableMemoization: boolean;
  };
  diagnostics: {
    enableProfiler: boolean;
    enableOverlay: boolean;
  };
  plugins: {
    sandboxEnabled: boolean;
  };
  seo: {
    enableSitemaps: boolean;
  };
  development: {
    isDevMode: boolean;
  };
  budgets: {
    maxRenderTimeMs: number;
    maxHydrationTimeMs: number;
    maxVDOMDepth: number;
    maxConcurrentIslands: number;
  };
}

export class RendererConfig {
  public readonly rendering: RendererConfigOptions["rendering"];
  public readonly hydration: RendererConfigOptions["hydration"];
  public readonly cache: RendererConfigOptions["cache"];
  public readonly performance: RendererConfigOptions["performance"];
  public readonly diagnostics: RendererConfigOptions["diagnostics"];
  public readonly plugins: RendererConfigOptions["plugins"];
  public readonly seo: RendererConfigOptions["seo"];
  public readonly development: RendererConfigOptions["development"];
  public readonly budgets: RendererConfigOptions["budgets"];

  constructor(options: RendererConfigOptions) {
    this.rendering = options.rendering;
    this.hydration = options.hydration;
    this.cache = options.cache;
    this.performance = options.performance;
    this.diagnostics = options.diagnostics;
    this.plugins = options.plugins;
    this.seo = options.seo;
    this.development = options.development;
    this.budgets = options.budgets;
  }
}
