import { Registry } from "@klin/registry";
import { EventBus } from "@klin/event-bus";
import { CommandEngine } from "@klin/command-engine";
import { ThemeEngine } from "@klin/theme";
import { BuilderState } from "../state/BuilderState";

export interface BuilderContext {
  workspaceId: string;
  projectId: string;
  registry: Registry;
  eventBus: EventBus;
  commandEngine: CommandEngine;
  themeEngine: ThemeEngine;
  builderState: BuilderState;
}
