import { DesignState } from "../types/templates";

export interface PuckPluginContext {
  onSaveState?: (state: DesignState) => void | Promise<void>;
}

export const createAutosavePuckPlugin = (context: PuckPluginContext) => {
  return {
    name: "KlinAutosavePlugin",
    renderRoot: ({ children }: { children: React.ReactNode }) => {
      // Custom wrapper around editor view if needed
      return children;
    },
    onStateChange: (state: any) => {
      // In a real Puck plugin, this receives user edits. We trigger parent callbacks.
      if (context.onSaveState && state.data) {
        context.onSaveState(state.data as DesignState);
      }
    },
  };
};
