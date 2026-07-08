import { EventBus } from "@klin/event-bus";
import { generateId } from "@klin/core";

export class RegistryWatcher {
  private eventBus: EventBus;
  private subId: string;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
    this.subId = generateId("pkg");
  }

  watch(callback: () => void) {
    this.eventBus.subscriptions.add({
      id: this.subId,
      name: "RegistryWatcher",
      eventNamePattern: "registry.*",
      callback: () => {
        callback();
      },
    });
  }

  unwatch() {
    this.eventBus.subscriptions.remove(this.subId);
  }
}
