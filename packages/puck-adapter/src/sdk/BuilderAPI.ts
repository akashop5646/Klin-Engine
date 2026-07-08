import { BuilderContext } from "../core/BuilderContext";
import { PanelRegistry, PanelDefinition } from "../panels/PanelRegistry";
import { ToolbarRegistry } from "../toolbar/ToolbarRegistry";
import { ToolbarAction } from "../toolbar/ToolbarAction";
import { ShortcutManager, ShortcutCallback } from "../shortcuts/ShortcutManager";

export class BuilderAPI {
  private context: BuilderContext;
  private panels: PanelRegistry;
  private toolbar: ToolbarRegistry;
  private shortcuts: ShortcutManager;

  constructor(
    context: BuilderContext,
    panels: PanelRegistry,
    toolbar: ToolbarRegistry,
    shortcuts: ShortcutManager
  ) {
    this.context = context;
    this.panels = panels;
    this.toolbar = toolbar;
    this.shortcuts = shortcuts;
  }

  getContext(): BuilderContext {
    return this.context;
  }

  registerPanel(panel: PanelDefinition) {
    this.panels.register(panel);
  }

  registerToolbarAction(action: ToolbarAction) {
    this.toolbar.register(action);
  }

  registerShortcut(keys: string, callback: ShortcutCallback) {
    this.shortcuts.register(keys, callback);
  }
}
