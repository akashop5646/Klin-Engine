import { KlinComponentDefinition } from "./components";
import { DesignState } from "./templates";

export interface PuckIntegrationConfig {
  components: Record<string, KlinComponentDefinition>;
  onPublish: (data: DesignState) => void | Promise<void>;
  onChange?: (data: DesignState) => void;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  action: string;
  state: DesignState;
}

export interface PuckHistoryStack {
  past: HistoryItem[];
  present: DesignState;
  future: HistoryItem[];
}
