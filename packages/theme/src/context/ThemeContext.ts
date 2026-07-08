import { EventBus } from "@klin/event-bus";

export interface ThemeContext {
  workspaceId: string;
  projectId: string;
  themeId: string;
  mode: "Light" | "Dark" | "HighContrast" | "Print" | "Editor";
  scope: string;
  viewport: string;
  platform: "Storefront" | "Dashboard" | "Builder Canvas" | "Preview Window";
  eventBus: EventBus;
}
