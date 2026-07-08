import { RenderRuntime } from "./RenderRuntime";

export class ClientRuntime extends RenderRuntime {
  public readonly name = "Client";

  public executeRender(tree: any): string {
    return "Browser CSR Rendered HTML";
  }
}
