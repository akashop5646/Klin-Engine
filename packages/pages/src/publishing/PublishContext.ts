import type { PageInstance } from "../core/PageFactory";
import type { RenderTree } from "../render-tree/RenderTree";

export interface PublishContext {
  pageInstance: PageInstance;
  renderTree: RenderTree;
  target: "static" | "nextjs" | "wordpress" | "email" | "shopify" | "native";
  output?: string;
  metadata?: Record<string, unknown>;
}
