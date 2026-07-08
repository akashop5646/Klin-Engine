export interface EditorStateData {
  selection: string[] | null;
  hover: string | null;
  clipboard: any | null;
  viewport: { width: number; height: number };
  zoom: number;
  guides: any[];
  snaplines: any[];
  drag: any | null;
  drop: any | null;
  activePage: string | null;
  activeTheme: string | null;
  activeLocale: string | null;
  activeBreakpoint: string | null;
  undoDepth: number;
  redoDepth: number;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
}

export type EditorStateListener = (state: EditorStateData) => void;

export class EditorState {
  private data: EditorStateData = {
    selection: null,
    hover: null,
    clipboard: null,
    viewport: { width: 1280, height: 800 },
    zoom: 1,
    guides: [],
    snaplines: [],
    drag: null,
    drop: null,
    activePage: null,
    activeTheme: null,
    activeLocale: "en",
    activeBreakpoint: "desktop",
    undoDepth: 0,
    redoDepth: 0,
    isDirty: false,
    isSaving: false,
    lastSaved: null,
  };

  private listeners: Set<EditorStateListener> = new Set();

  getState(): EditorStateData {
    return { ...this.data };
  }

  update(patch: Partial<EditorStateData>) {
    this.data = { ...this.data, ...patch };
    this.notifyListeners();
  }

  subscribe(listener: EditorStateListener): () => void {
    this.listeners.add(listener);
    listener(this.data);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.data);
      } catch (err) {
        console.error("EditorState listener error:", err);
      }
    });
  }
}
