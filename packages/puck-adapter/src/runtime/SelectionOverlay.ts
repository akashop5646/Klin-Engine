import { EditorState } from "../state/EditorState";

export class SelectionOverlay {
  private editorState: EditorState;

  constructor(editorState: EditorState) {
    this.editorState = editorState;
  }

  calculateBounds(elementId: string): { x: number; y: number; width: number; height: number } | null {
    const el = document.getElementById(elementId);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
    };
  }

  updateOverlay(elementId: string) {
    const bounds = this.calculateBounds(elementId);
    if (bounds) {
      this.editorState.update({
        guides: [
          { type: "outline", ...bounds }
        ]
      });
    }
  }
}
