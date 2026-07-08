import { RenderRuntime } from "./RenderRuntime";

export class ServerRuntime extends RenderRuntime {
  public readonly name = "Server";

  public executeRender(tree: any): string {
    return "Server SSR Rendered HTML String";
  }
}
