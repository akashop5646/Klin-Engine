import { HistoryManager } from "../managers/history/HistoryManager";
import { Result } from "@klin/core";

export class HistoryAPI {
  private manager: HistoryManager;

  constructor(manager: HistoryManager) {
    this.manager = manager;
  }

  async undo(): Promise<Result<void, Error>> {
    return this.manager.undo();
  }

  async redo(): Promise<Result<void, Error>> {
    return this.manager.redo();
  }
}
