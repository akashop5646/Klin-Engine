import { Registry } from "@klin/registry";
import { EventBus } from "@klin/event-bus";
import { CommandEngine } from "@klin/command-engine";

export interface BlockContext {
  workspaceId: string;
  projectId: string;
  pageId: string;
  themeContext: any;
  builderContext: any;
  viewport: {
    width: number;
    height: number;
    type: "desktop" | "laptop" | "tablet" | "mobile" | "custom";
  };
  locale: string;
  direction: "ltr" | "rtl";
  registry: Registry;
  eventBus: EventBus;
  commandEngine: CommandEngine;
}
