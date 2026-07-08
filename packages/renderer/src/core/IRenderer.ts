import type { RenderTree } from "@klin/pages";
import type { RendererContext } from "./RendererContext";
import type { RenderResult } from "../contracts/RenderResult";

export interface IRenderer {
  id: string;
  supports(target: string): boolean;
  render(tree: RenderTree, context: RendererContext): Promise<RenderResult>;
}
