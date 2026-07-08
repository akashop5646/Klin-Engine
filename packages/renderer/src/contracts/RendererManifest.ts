import type { RenderTarget } from "./RenderTarget";

export interface RendererManifest {
  id: string;
  name: string;
  version: string;
  supportedTargets: RenderTarget[];
  supportedFeatures: string[];
  author: string;
  priority: number;
}
