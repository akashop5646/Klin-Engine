import { KlinEvent } from "../events/KlinEvent";
import { Subscription } from "../subscriptions/Subscription";
import { Middleware } from "../middleware/Middleware";
import { Result, Ok, Err } from "@klin/core";

export interface RetryStrategy {
  type: "once" | "thrice" | "ignore" | "dlq";
}

export class EventDispatcher {
  private middlewares: Middleware[] = [];

  constructor(middlewares: Middleware[]) {
    this.middlewares = middlewares;
  }

  async dispatch(event: KlinEvent, subscribers: Subscription[]): Promise<Result<void, Error>[]> {
    const results: Result<void, Error>[] = [];

    for (const sub of subscribers) {
      let shouldDispatch = true;
      for (const middleware of this.middlewares) {
        if (middleware.beforeDispatch) {
          const allowed = await middleware.beforeDispatch(event, sub.name);
          if (!allowed) {
            shouldDispatch = false;
            break;
          }
        }
      }

      if (!shouldDispatch) {
        continue;
      }

      try {
        const mutableEvent = {
          ...event,
          metadata: {
            ...event.metadata,
            dispatchedAt: Date.now(),
          },
        };

        await sub.callback(mutableEvent);

        mutableEvent.metadata.completedAt = Date.now();

        for (const middleware of this.middlewares) {
          if (middleware.afterDispatch) {
            await middleware.afterDispatch(mutableEvent, sub.name, null);
          }
        }

        results.push(new Ok<void, Error>(undefined));
      } catch (err: any) {
        const error = err instanceof Error ? err : new Error(String(err));

        for (const middleware of this.middlewares) {
          if (middleware.onError) {
            await middleware.onError(event, sub.name, error);
          }
        }

        results.push(new Err<void, Error>(error));
      }
    }

    return results;
  }
}
