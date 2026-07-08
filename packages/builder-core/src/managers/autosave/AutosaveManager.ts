import { BuilderStore } from "../../state/BuilderStore";
import { EventService } from "../../services/EventService";

export class AutosaveManager {
  private store: BuilderStore;
  private eventService: EventService;
  private timer: any = null;
  private debounceMs = 2000;

  constructor(store: BuilderStore, eventService: EventService) {
    this.store = store;
    this.eventService = eventService;
  }

  markDirty() {
    this.store.update({ dirty: true });
    this.eventService.publish("builder.autosave.started", {});
    this.triggerAutosave();
  }

  private triggerAutosave() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      this.store.update({ saving: true });
      
      try {
        const state = this.store.getState();
        // Fallback safety for Node environments during builds
        if (typeof localStorage !== "undefined" && state.projectId) {
          localStorage.setItem(`klin.builder.recovery.${state.projectId}`, JSON.stringify(state));
        }
        
        this.store.update({ dirty: false, saving: false });
        this.eventService.publish("builder.autosave.completed", { timestamp: Date.now() });
      } catch (err) {
        this.store.update({ saving: false });
        console.error("Autosave failed:", err);
      }
    }, this.debounceMs);
  }

  dispose() {
    if (this.timer) clearTimeout(this.timer);
  }
}
