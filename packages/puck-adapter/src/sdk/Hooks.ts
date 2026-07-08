import { useState, useEffect } from "react";
import { EditorState, EditorStateData } from "../state/EditorState";

export function useEditorState(editorState: EditorState): EditorStateData {
  const [state, setState] = useState<EditorStateData>(editorState.getState());

  useEffect(() => {
    return editorState.subscribe((updated) => {
      setState(updated);
    });
  }, [editorState]);

  return state;
}
