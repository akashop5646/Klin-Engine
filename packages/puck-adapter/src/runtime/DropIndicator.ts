import { EditorState } from "../state/EditorState";

export class DropIndicator {
  private editorState: EditorState;

  constructor(editorState: EditorState) {
    this.editorState = editorState;
  }

  showIndicator(position: { x: number; y: number; width: number }) {
    this.editorState.update({
      snaplines: [
        { type: "drop-line", ...position }
      ]
    });
  }

  hideIndicator() {
    this.editorState.update({ snaplines: [] });
  }
}
