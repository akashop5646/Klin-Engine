import { Result, Ok } from "@klin/core";

export class ComponentLoader {
  static async loadComponentCode(componentId: string): Promise<Result<any, Error>> {
    const componentMap = (globalThis as any).__KLIN_COMPONENTS__ || {};
    const ComponentClass = componentMap[componentId];
    return new Ok<any, Error>(ComponentClass || null);
  }
}
