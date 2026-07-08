import { EventBus } from "@klin/event-bus";

export class EventService {
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  async publish(name: string, payload: any, source: string = "builder-core") {
    await this.eventBus.getPublisher().publish(name, payload, source);
  }
}
