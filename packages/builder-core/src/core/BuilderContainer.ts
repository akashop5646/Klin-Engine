import { Registry } from "@klin/registry";
import { EventBus } from "@klin/event-bus";
import { CommandEngine } from "@klin/command-engine";
import { ThemeEngine } from "@klin/theme";

import { BuilderStore } from "../state/BuilderStore";
import { EventService } from "../services/EventService";
import { ThemeService } from "../services/ThemeService";
import { RegistryService } from "../services/RegistryService";
import { CommandService } from "../services/CommandService";

export class BuilderContainer {
  readonly store = new BuilderStore();
  
  // Services
  eventService!: EventService;
  themeService!: ThemeService;
  registryService!: RegistryService;
  commandService!: CommandService;

  // Managers
  workspaceManager: any;
  selectionManager: any;
  historyManager: any;
  clipboardManager: any;
  viewportManager: any;
  guideManager: any;
  autosaveManager: any;
  shortcutManager: any;
  pluginHost: any;
  inspectorManager: any;

  registerCoreDependencies(dependencies: {
    registry: Registry;
    eventBus: EventBus;
    commandEngine: CommandEngine;
    themeEngine: ThemeEngine;
  }) {
    this.eventService = new EventService(dependencies.eventBus);
    this.themeService = new ThemeService(dependencies.themeEngine);
    this.registryService = new RegistryService(dependencies.registry);
    this.commandService = new CommandService(dependencies.commandEngine);
  }
}
