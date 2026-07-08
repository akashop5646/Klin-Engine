import { SelectionState } from "./SelectionState";
import { HistoryState } from "./HistoryState";
import { ViewportState } from "./ViewportState";
import { ClipboardState } from "./ClipboardState";

export class StudioState {
  public selection: SelectionState = new SelectionState();
  public history: HistoryState = new HistoryState();
  public viewport: ViewportState = new ViewportState();
  public clipboard: ClipboardState = new ClipboardState();

  public get isDirty(): boolean {
    return this.history.canUndo;
  }
}
export default StudioState;
