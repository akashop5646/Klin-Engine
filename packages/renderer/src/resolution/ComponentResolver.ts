import type { RendererContext } from "../core/RendererContext";

export class ComponentResolver {
  async resolveBlockComponent(blockId: string, context: RendererContext): Promise<any | undefined> {
    try {
      const blockDef = await context.registry.resolve("block", blockId);
      if (blockDef && (blockDef as any).component) {
        return (blockDef as any).component;
      }
      if (blockDef && (blockDef as any).implementation) {
        return (blockDef as any).implementation;
      }
      return blockDef;
    } catch (err) {
      console.error(`ComponentResolver failed to resolve component [${blockId}]:`, err);
      return undefined;
    }
  }
}
