import { Registry } from "@klin/registry";
import { EventBus } from "@klin/event-bus";

export interface TemplateContext {
  workspaceId: string;
  projectId: string;
  pageId: string;
  locale: string;
  viewport: {
    width: number;
    height: number;
    type: "desktop" | "laptop" | "tablet" | "mobile" | "custom";
  };
  theme: any;
  registry: Registry;
  builder: any;
  eventBus: EventBus;
}
