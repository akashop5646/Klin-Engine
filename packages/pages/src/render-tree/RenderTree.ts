import type { RenderNode } from "./RenderNode.ts";

export interface RenderTree {
  version: string;
  generatedAt: number;
  pageId: string;
  templateId: string;
  themeId: string;
  locale: string;
  rendererVersion: string;
  pipelineVersion: string;
  root: RenderNode[];
  metadata?: Record<string, unknown>;
}
