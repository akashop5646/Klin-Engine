import { KlinEvent } from "../events/KlinEvent";
import { Middleware } from "../middleware/Middleware";
import { Priority } from "../priority";
import { PublishOptions } from "../types";
import { generateId } from "@klin/core";
import { deepFreeze } from "../utils/freeze";

export class EventPublisher {
  private middlewares: Middleware[];
  private publishCallback: (event: KlinEvent) => Promise<void>;

  constructor(middlewares: Middleware[], publishCallback: (event: KlinEvent) => Promise<void>) {
    this.middlewares = middlewares;
    this.publishCallback = publishCallback;
  }

  async publish<T>(name: string, payload: T, source: string, options?: PublishOptions): Promise<KlinEvent<T> | null> {
    const rawEvent: KlinEvent<T> = {
      id: generateId("evt"),
      name,
      version: "1.0.0",
      timestamp: Date.now(),
      source,
      correlationId: options?.correlationId,
      causationId: options?.causationId,
      context: options?.context || {},
      metadata: {
        createdAt: Date.now(),
        publishedAt: Date.now(),
        retryCount: 0,
        priority: options?.metadata?.priority || Priority.NORMAL,
        ...options?.metadata,
      },
      payload,
    };

    let event: KlinEvent<T> | null = rawEvent;
    for (const middleware of this.middlewares) {
      if (middleware.beforePublish) {
        event = (await middleware.beforePublish(event)) as KlinEvent<T> | null;
        if (!event) {
          return null;
        }
      }
    }

    const frozenEvent = deepFreeze(JSON.parse(JSON.stringify(event)));
    await this.publishCallback(frozenEvent);

    for (const middleware of this.middlewares) {
      if (middleware.afterPublish) {
        await middleware.afterPublish(event);
      }
    }

    return event;
  }

  async publishSync<T>(name: string, payload: T, source: string, options?: PublishOptions): Promise<KlinEvent<T> | null> {
    return this.publish(name, payload, source, options);
  }

  async publishAsync<T>(name: string, payload: T, source: string, options?: PublishOptions): Promise<KlinEvent<T> | null> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await this.publish(name, payload, source, options);
        resolve(result);
      }, 0);
    });
  }

  async publishBatch(events: Array<{ name: string; payload: any; source: string; options?: PublishOptions }>): Promise<(KlinEvent | null)[]> {
    return Promise.all(events.map((e) => this.publish(e.name, e.payload, e.source, e.options)));
  }
}
