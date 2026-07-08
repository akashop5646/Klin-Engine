import { Registry } from "@klin/registry";
import { EventBus } from "@klin/event-bus";
import { CommandEngine } from "@klin/command-engine";
import { ThemeEngine } from "@klin/theme";

import { BuilderContainer } from "./BuilderContainer";
import { BuilderLifecycle } from "./BuilderLifecycle";
import { WorkspaceManager } from "../managers/workspace/WorkspaceManager";
import { SelectionManager } from "../managers/selection/SelectionManager";
import { HistoryManager } from "../managers/history/HistoryManager";
import { ClipboardManager } from "../managers/clipboard/ClipboardManager";
import { ViewportManager } from "../managers/viewport/ViewportManager";
import { GuideManager } from "../managers/guides/GuideManager";
import { AutosaveManager } from "../managers/autosave/AutosaveManager";
import { ShortcutManager } from "../managers/shortcuts/ShortcutManager";
import { PluginHost } from "../managers/plugins/PluginHost";
import { InspectorManager } from "../managers/inspector/InspectorManager";

export class BuilderKernel {
  private container: BuilderContainer;
  private lifecycle: BuilderLifecycle;

  constructor(container: BuilderContainer, lifecycle: BuilderLifecycle) {
    this.container = container;
    this.lifecycle = lifecycle;
  }

  async boot(dependencies: {
    registry: Registry;
    eventBus: EventBus;
    commandEngine: CommandEngine;
    themeEngine: ThemeEngine;
  }) {
    this.lifecycle.transitionTo("Initializing");

    // 1. Dependency Container registration
    this.container.registerCoreDependencies(dependencies);

    // 2. State & Services allocation
    const store = this.container.store;
    const eventService = this.container.eventService;
    const themeService = this.container.themeService;
    const commandService = this.container.commandService;

    // 3. Manager allocation
    this.container.workspaceManager = new WorkspaceManager(store, eventService);
    this.container.selectionManager = new SelectionManager(store, eventService);
    this.container.historyManager = new HistoryManager(store, commandService, eventService);
    this.container.clipboardManager = new ClipboardManager(store, eventService);
    this.container.viewportManager = new ViewportManager(store, eventService);
    this.container.guideManager = new GuideManager(store);
    this.container.autosaveManager = new AutosaveManager(store, eventService);
    this.container.shortcutManager = new ShortcutManager(eventService);
    this.container.pluginHost = new PluginHost(store, eventService);
    this.container.inspectorManager = new InspectorManager(store);

    this.lifecycle.transitionTo("Loading Project");
  }

  async shutdown() {
    this.lifecycle.transitionTo("Disposed");
    
    // Dispose managers
    if (this.container.autosaveManager) {
      this.container.autosaveManager.dispose();
    }
  }
}
