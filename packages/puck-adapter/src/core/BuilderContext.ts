import { Registry } from "@klin/registry";
import { EventBus } from "@klin/event-bus";
import { CommandEngine } from "@klin/command-engine";

export interface BuilderContext {
  workspaceId: string;
  projectId: string;
  themeId: string;
  pageId: string;
  builderMode: "edit" | "preview" | "publish";
  viewport: { width: number; height: number; type: "desktop" | "tablet" | "mobile" };
  selectedNode: string | null;
  clipboard: any | null;
  registry: Registry;
  eventBus: EventBus;
  commandEngine: CommandEngine;
}
