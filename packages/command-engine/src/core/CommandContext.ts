import { EventBus } from "@klin/event-bus";

export interface CommandContext {
  workspaceId: string;
  projectId: string;
  userId: string;
  eventBus: EventBus;
  state: {
    layout: any;
    selection: {
      selectedNodeId: string | null;
      hoveredNodeId: string | null;
    };
    theme: any;
  };
}
