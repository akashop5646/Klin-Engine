import type { RendererOptions } from "../contracts/RendererOptions";

export class RendererSerializer {
  serialize(options: RendererOptions): string {
    return JSON.stringify({
      schemaVersion: "1.0.0",
      options,
    }, null, 2);
  }
}
