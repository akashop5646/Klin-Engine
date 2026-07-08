import { Middleware } from "./Middleware";
import { KlinEvent } from "../events/KlinEvent";
import { logger } from "@klin/core";

export class LoggingMiddleware implements Middleware {
  async beforePublish(event: KlinEvent): Promise<KlinEvent> {
    logger.info(`[EventBus] Publishing event: "${event.name}" (ID: ${event.id})`);
    return event;
  }

  async afterPublish(event: KlinEvent): Promise<void> {
    logger.info(`[EventBus] Published event: "${event.name}" (ID: ${event.id})`);
  }

  async beforeDispatch(event: KlinEvent, subscriberName: string): Promise<boolean> {
    logger.info(`[EventBus] Dispatching "${event.name}" to subscriber: "${subscriberName}"`);
    return true;
  }

  async afterDispatch(event: KlinEvent, subscriberName: string, _result: any): Promise<void> {
    logger.info(`[EventBus] Dispatched "${event.name}" to subscriber: "${subscriberName}" successfully`);
  }

  async onError(event: KlinEvent, subscriberName: string, error: Error): Promise<void> {
    logger.error(`[EventBus] Dispatch of "${event.name}" to "${subscriberName}" failed: ${error.message}`);
  }
}
