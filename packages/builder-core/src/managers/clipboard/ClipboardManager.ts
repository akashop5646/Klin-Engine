import { BuilderStore } from "../../state/BuilderStore";
import { EventService } from "../../services/EventService";

export class ClipboardManager {
  private store: BuilderStore;
  private eventService: EventService;

  constructor(store: BuilderStore, eventService: EventService) {
    this.store = store;
    this.eventService = eventService;
  }

  copy(data: any) {
    this.store.update({ clipboard: data });
    this.eventService.publish("builder.clipboard.updated", { action: "copy", data });
  }

  cut(data: any): any {
    this.store.update({ clipboard: data });
    this.eventService.publish("builder.clipboard.updated", { action: "cut", data });
    return data;
  }

  paste(): any | null {
    const data = this.store.getState().clipboard;
    this.eventService.publish("builder.clipboard.updated", { action: "paste" });
    return data;
  }

  duplicate(data: any): any {
    const cloned = JSON.parse(JSON.stringify(data));
    if (cloned.id) {
      cloned.id = `${cloned.id}_copy_${Math.random().toString(36).substring(2, 7)}`;
    }
    this.eventService.publish("builder.clipboard.updated", { action: "duplicate" });
    return cloned;
  }
}
