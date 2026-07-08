import { BuilderStore } from "../../state/BuilderStore";
import { EventService } from "../../services/EventService";

export interface BuilderPluginInstance {
  id: string;
  name: string;
  enabled: boolean;
  plugin: any;
}

export class PluginHost {
  private store: BuilderStore;
  private eventService: EventService;
  private plugins: Map<string, BuilderPluginInstance> = new Map();

  constructor(store: BuilderStore, eventService: EventService) {
    this.store = store;
    this.eventService = eventService;
  }

  registerPlugin(id: string, name: string, plugin: any) {
    this.plugins.set(id, { id, name, enabled: true, plugin });
    this.store.update({ plugins: Array.from(this.plugins.keys()) });
    this.eventService.publish("builder.plugin.loaded", { pluginId: id });
  }

  unregisterPlugin(id: string) {
    this.plugins.delete(id);
    this.store.update({ plugins: Array.from(this.plugins.keys()) });
  }

  enablePlugin(id: string) {
    const plugin = this.plugins.get(id);
    if (plugin) {
      plugin.enabled = true;
    }
  }

  disablePlugin(id: string) {
    const plugin = this.plugins.get(id);
    if (plugin) {
      plugin.enabled = false;
    }
  }
}
