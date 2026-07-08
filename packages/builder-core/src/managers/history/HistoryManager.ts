import { Result } from "@klin/core";
import { BuilderStore } from "../../state/BuilderStore";
import { CommandService } from "../../services/CommandService";
import { EventService } from "../../services/EventService";

export class HistoryManager {
  private store: BuilderStore;
  private commandService: CommandService;
  private eventService: EventService;

  constructor(store: BuilderStore, commandService: CommandService, eventService: EventService) {
    this.store = store;
    this.commandService = commandService;
    this.eventService = eventService;
  }

  async undo(): Promise<Result<void, Error>> {
    const res = await this.commandService.undo();
    if (res.ok) {
      this.updateHistoryState(true);
      this.eventService.publish("builder.history.updated", { action: "undo" });
    }
    return res;
  }

  async redo(): Promise<Result<void, Error>> {
    const res = await this.commandService.redo();
    if (res.ok) {
      this.updateHistoryState(false);
      this.eventService.publish("builder.history.updated", { action: "redo" });
    }
    return res;
  }

  private updateHistoryState(isUndo: boolean) {
    const current = this.store.getState().history;
    this.store.update({
      history: {
        undoDepth: isUndo ? Math.max(0, current.undoDepth - 1) : current.undoDepth + 1,
        redoDepth: isUndo ? current.redoDepth + 1 : Math.max(0, current.redoDepth - 1),
        isDirty: true,
      },
    });
  }
}
