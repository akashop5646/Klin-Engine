export interface BuilderSessionData {
  searchQuery: string;
  visiblePanels: string[];
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
}

export class BuilderSession {
  private data: BuilderSessionData = {
    searchQuery: "",
    visiblePanels: ["layers", "components", "inspector"],
    showGrid: false,
    snapToGrid: true,
    gridSize: 8,
  };

  getSession(): BuilderSessionData {
    return { ...this.data };
  }

  updateSession(patch: Partial<BuilderSessionData>) {
    this.data = { ...this.data, ...patch };
  }
}
