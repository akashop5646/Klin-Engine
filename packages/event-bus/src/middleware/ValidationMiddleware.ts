import { Middleware } from "./Middleware";
import { KlinEvent } from "../events/KlinEvent";
import { logger } from "@klin/core";

export class ValidationMiddleware implements Middleware {
  async beforePublish(event: KlinEvent): Promise<KlinEvent | null> {
    if (!event.name || typeof event.name !== "string") {
      logger.warn("[EventBus:Validation] Event is missing a valid name.");
      return null;
    }
    if (!event.id || typeof event.id !== "string") {
      logger.warn("[EventBus:Validation] Event is missing a valid ID.");
      return null;
    }
    return event;
  }
}
