import type { WebsiteContext } from "./WebsiteContext";
import type { PageDefinition } from "./PageDefinition";
import type { TemplateInstance } from "@klin/templates";
import type { Registry } from "@klin/registry";
import type { EventBus } from "@klin/event-bus";
import type { CommandEngine } from "@klin/command-engine";
import type { AssetManager } from "../assets/AssetManager";

export interface PageContext {
  websiteContext: WebsiteContext;
  page: PageDefinition;
  template: TemplateInstance | null;
  theme: any;
  locale: string;
  viewport: {
    width: number;
    height: number;
    type: "desktop" | "laptop" | "tablet" | "mobile" | "custom";
  };
  registry: Registry;
  eventBus: EventBus;
  commandEngine: CommandEngine;
  assetManager: AssetManager;
}
