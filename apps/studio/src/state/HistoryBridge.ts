import { HistoryState } from "./HistoryState";
import { BuilderIntegration } from "./BuilderIntegration";
import { TemplateSerializer } from "./TemplateSerializer";

export class HistoryBridge {
  private _history: HistoryState;
  private _builder: BuilderIntegration;
  private _serializer: TemplateSerializer;

  constructor(history: HistoryState, builder: BuilderIntegration, serializer: TemplateSerializer) {
    this._history = history;
    this._builder = builder;
    this._serializer = serializer;
  }

  public checkpoint(): void {
    const currentJson = this._serializer.serialize(this._builder.getLayoutTree());
    this._history.pushState(currentJson);
    console.log("[HistoryBridge] Created history checkpoint.");
  }

  public undo(): boolean {
    const currentJson = this._serializer.serialize(this._builder.getLayoutTree());
    const prevJson = this._history.undo(currentJson);
    if (prevJson) {
      const tree = this._serializer.deserialize(prevJson);
      this._builder.setLayoutTree(tree);
      console.log("[HistoryBridge] Undone builder layout changes.");
      return true;
    }
    return false;
  }

  public redo(): boolean {
    const currentJson = this._serializer.serialize(this._builder.getLayoutTree());
    const nextJson = this._history.redo(currentJson);
    if (nextJson) {
      const tree = this._serializer.deserialize(nextJson);
      this._builder.setLayoutTree(tree);
      console.log("[HistoryBridge] Redone builder layout changes.");
      return true;
    }
    return false;
  }
}
export default HistoryBridge;
