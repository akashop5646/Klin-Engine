import { BuilderContainer } from "../core/BuilderContainer";
import { WorkspaceAPI } from "./WorkspaceAPI";
import { HistoryAPI } from "./HistoryAPI";
import { ClipboardAPI } from "./ClipboardAPI";

export class BuilderAPI {
  readonly workspace: WorkspaceAPI;
  readonly history: HistoryAPI;
  readonly clipboard: ClipboardAPI;

  constructor(container: BuilderContainer) {
    this.workspace = new WorkspaceAPI(container.workspaceManager);
    this.history = new HistoryAPI(container.historyManager);
    this.clipboard = new ClipboardAPI(container.clipboardManager);
  }
}
