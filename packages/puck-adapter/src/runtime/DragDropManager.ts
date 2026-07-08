import { EditorState } from "../state/EditorState";

export class DragDropManager {
  private editorState: EditorState;

  constructor(editorState: EditorState) {
    this.editorState = editorState;
  }

  startDrag(draggedItem: any) {
    this.editorState.update({ drag: draggedItem });
  }

  endDrag() {
    this.editorState.update({ drag: null, drop: null });
  }

  updateDropTarget(target: any) {
    this.editorState.update({ drop: target });
  }
}
