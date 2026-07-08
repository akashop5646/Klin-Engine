export interface ViewportState {
  width: number;
  height: number;
  type: "desktop" | "laptop" | "tablet" | "mobile" | "custom";
  zoom: number;
  pan: { x: number; y: number };
}

export interface SelectionState {
  selectedNodeIds: string[] | null;
  hoveredNodeId: string | null;
}

export interface HistoryState {
  undoDepth: number;
  redoDepth: number;
  isDirty: boolean;
}

export interface BuilderState {
  workspaceId: string | null;
  projectId: string | null;
  activePage: string | null;
  viewport: ViewportState;
  selection: SelectionState;
  clipboard: any | null;
  history: HistoryState;
  guides: any[];
  snaplines: any[];
  activeTheme: string | null;
  locale: string;
  dirty: boolean;
  saving: boolean;
  plugins: string[];
}
