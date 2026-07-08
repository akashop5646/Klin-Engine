import { EventRegistry } from "./EventRegistry";
import { EventPublisher } from "../publisher/EventPublisher";
import { SubscriptionManager } from "../subscriptions/SubscriptionManager";
import { EventDispatcher } from "../dispatcher/EventDispatcher";
import { EventHistory } from "../history/EventHistory";
import { ReplayEngine } from "../replay/ReplayEngine";
import { Transport } from "../transports/Transport";
import { MemoryTransport } from "../transports/MemoryTransport";
import { Middleware } from "../middleware/Middleware";
import { KlinEvent } from "../events/KlinEvent";

export class EventBus {
  readonly registry = new EventRegistry();
  readonly subscriptions = new SubscriptionManager();
  readonly history = new EventHistory();
  
  private middlewares: Middleware[] = [];
  private dispatcher: EventDispatcher;
  private publisher: EventPublisher;
  private transport: Transport;

  constructor(middlewares: Middleware[] = [], transport?: Transport) {
    this.middlewares = middlewares;
    this.dispatcher = new EventDispatcher(this.middlewares);
    this.transport = transport || new MemoryTransport();

    this.publisher = new EventPublisher(this.middlewares, async (event) => {
      await this.transport.publish(event);
    });

    this.transport.subscribe(async (event) => {
      const subs = this.subscriptions.getSubscribersForEvent(event);
      await this.dispatcher.dispatch(event, subs);
      this.history.record(event, subs.length);
    });
  }

  getPublisher(): EventPublisher {
    return this.publisher;
  }

  getReplayEngine(): ReplayEngine {
    return new ReplayEngine(this.history, async (event) => {
      await this.transport.publish(event);
    });
  }

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
    this.dispatcher = new EventDispatcher(this.middlewares);
    this.publisher = new EventPublisher(this.middlewares, async (event) => {
      await this.transport.publish(event);
    });
  }
}
