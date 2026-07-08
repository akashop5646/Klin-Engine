import type { RendererOptions } from "../contracts/RendererOptions";
import { Result, Ok, Err } from "@klin/core";

export class RendererDeserializer {
  deserialize(json: string): Result<RendererOptions, Error> {
    try {
      const parsed = JSON.parse(json);
      if (!parsed.options) {
        return new Err(new Error("Invalid serialized configuration: missing options structure."));
      }
      return new Ok(parsed.options as RendererOptions);
    } catch (err) {
      return new Err(err as Error);
    }
  }
}
