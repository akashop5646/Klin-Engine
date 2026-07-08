import { EventService } from "../../services/EventService";

export type ShortcutHandler = () => void;

export class ShortcutManager {
  private eventService: EventService;
  private keymap: Map<string, ShortcutHandler> = new Map();

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  register(keys: string, handler: ShortcutHandler) {
    this.keymap.set(keys.toLowerCase().replace(/\s+/g, ""), handler);
  }

  execute(keys: string) {
    const normalized = keys.toLowerCase().replace(/\s+/g, "");
    const handler = this.keymap.get(normalized);
    if (handler) {
      handler();
      this.eventService.publish("builder.shortcut.executed", { shortcut: keys });
    }
  }
}
