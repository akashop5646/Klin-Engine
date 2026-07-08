export abstract class RenderRuntime {
  public abstract readonly name: string;
  public abstract executeRender(tree: any): string;
}
