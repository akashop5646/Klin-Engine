import { z } from "zod";

export class EventRegistry {
  private schemas = new Map<string, z.ZodType<any>>();

  register(eventName: string, schema: z.ZodType<any>) {
    this.schemas.set(eventName, schema);
  }

  getSchema(eventName: string): z.ZodType<any> | undefined {
    return this.schemas.get(eventName);
  }

  has(eventName: string): boolean {
    return this.schemas.has(eventName);
  }
}
