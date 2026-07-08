import { RenderRuntime } from "./RenderRuntime";

export class EdgeRuntime extends RenderRuntime {
  public readonly name = "Edge";

  public executeRender(tree: any): string {
    return "V8 Edge Rendered HTML stream";
  }
}
