import { EventBus } from "@klin/event-bus";

export interface RegistryContext {
  workspaceId: string;
  projectId: string;
  userId: string;
  eventBus: EventBus;
}
