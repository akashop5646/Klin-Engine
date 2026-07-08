import { BuilderState } from "./BuilderState";

export type StoreListener = (state: BuilderState) => void;

export class BuilderStore {
  private state: BuilderState = {
    workspaceId: null,
    projectId: null,
    activePage: null,
    viewport: {
      width: 1280,
      height: 800,
      type: "desktop",
      zoom: 1,
      pan: { x: 0, y: 0 },
    },
    selection: {
      selectedNodeIds: null,
      hoveredNodeId: null,
    },
    clipboard: null,
    history: {
      undoDepth: 0,
      redoDepth: 0,
      isDirty: false,
    },
    guides: [],
    snaplines: [],
    activeTheme: null,
    locale: "en",
    dirty: false,
    saving: false,
    plugins: [],
  };

  private listeners: Set<StoreListener> = new Set();

  getState(): BuilderState {
    return {
      ...this.state,
      viewport: { ...this.state.viewport },
      selection: { ...this.state.selection },
      history: { ...this.state.history },
      guides: [...this.state.guides],
      snaplines: [...this.state.snaplines],
      plugins: [...this.state.plugins],
    };
  }

  update(patch: Partial<BuilderState> | ((state: BuilderState) => Partial<BuilderState>)) {
    const nextPatch = typeof patch === "function" ? patch(this.state) : patch;
    this.state = {
      ...this.state,
      ...nextPatch,
      viewport: nextPatch.viewport ? { ...this.state.viewport, ...nextPatch.viewport } : this.state.viewport,
      selection: nextPatch.selection ? { ...this.state.selection, ...nextPatch.selection } : this.state.selection,
      history: nextPatch.history ? { ...this.state.history, ...nextPatch.history } : this.state.history,
    };
    this.notify();
  }

  subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (err) {
        console.error("Store listener error:", err);
      }
    });
  }
}
