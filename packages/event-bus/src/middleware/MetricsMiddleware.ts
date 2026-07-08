import { Middleware } from "./Middleware";
import { KlinEvent } from "../events/KlinEvent";

export class MetricsMiddleware implements Middleware {
  private startTimeMap = new Map<string, number>();

  async beforePublish(event: KlinEvent): Promise<KlinEvent> {
    this.startTimeMap.set(event.id, Date.now());
    return event;
  }

  async afterPublish(event: KlinEvent): Promise<void> {
    const start = this.startTimeMap.get(event.id);
    if (start) {
      event.metadata.duration = Date.now() - start;
      this.startTimeMap.delete(event.id);
    }
  }
}
