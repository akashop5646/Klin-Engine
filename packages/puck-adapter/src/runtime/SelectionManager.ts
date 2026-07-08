import { EditorState } from "../state/EditorState";

export class SelectionManager {
  private editorState: EditorState;

  constructor(editorState: EditorState) {
    this.editorState = editorState;
  }

  select(nodeIds: string[] | null) {
    this.editorState.update({ selection: nodeIds });
  }

  hover(nodeId: string | null) {
    this.editorState.update({ hover: nodeId });
  }

  clear() {
    this.editorState.update({ selection: null, hover: null });
  }
}
