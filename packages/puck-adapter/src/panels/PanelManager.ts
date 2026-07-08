import { PanelRegistry, PanelDefinition } from "./PanelRegistry";

export class PanelManager {
  private registry: PanelRegistry;
  private activePanelId: string | null = null;
  private visibilityMap: Map<string, boolean> = new Map();

  constructor(registry: PanelRegistry) {
    this.registry = registry;
  }

  getActivePanelId(): string | null {
    return this.activePanelId;
  }

  setActivePanel(panelId: string | null) {
    this.activePanelId = panelId;
    if (panelId) {
      this.visibilityMap.set(panelId, true);
    }
  }

  isVisible(panelId: string): boolean {
    return this.visibilityMap.get(panelId) ?? false;
  }

  toggleVisibility(panelId: string) {
    const visible = this.isVisible(panelId);
    this.visibilityMap.set(panelId, !visible);
  }
}
