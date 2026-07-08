import { EditorState } from "../state/EditorState";

export class ClipboardManager {
  private editorState: EditorState;

  constructor(editorState: EditorState) {
    this.editorState = editorState;
  }

  copy(data: any) {
    this.editorState.update({ clipboard: data });
  }

  paste(): any | null {
    return this.editorState.getState().clipboard;
  }

  clear() {
    this.editorState.update({ clipboard: null });
  }
}
