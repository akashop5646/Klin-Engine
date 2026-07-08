export interface PanelDefinition {
  id: string;
  name: string;
  icon?: string;
  render: () => any;
}

export class PanelRegistry {
  private panels: Map<string, PanelDefinition> = new Map();

  register(panel: PanelDefinition) {
    if (this.panels.has(panel.id)) {
      throw new Error(`Panel with ID "${panel.id}" already registered`);
    }
    this.panels.set(panel.id, panel);
  }

  unregister(panelId: string) {
    this.panels.delete(panelId);
  }

  getPanel(panelId: string): PanelDefinition | undefined {
    return this.panels.get(panelId);
  }

  listPanels(): PanelDefinition[] {
    return Array.from(this.panels.values());
  }
}
