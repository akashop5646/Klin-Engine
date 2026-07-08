export interface RenderManifestOptions {
  pages: string[];
  routes: Record<string, string>;
  chunks: string[];
  assets: string[];
}

export class RenderManifest {
  public pages: string[] = [];
  public routes: Record<string, string> = {};
  public chunks: string[] = [];
  public assets: string[] = [];

  constructor(options: RenderManifestOptions) {
    this.pages = options.pages;
    this.routes = options.routes;
    this.chunks = options.chunks;
    this.assets = options.assets;
  }
}
