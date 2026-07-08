export class LayoutPreset {
  public id: string;
  public label: string;
  public layoutShell: string; // e.g. "Sidebar", "SplitLayout", "Magazine", "Landing"

  constructor(id: string, label: string, shell: string) {
    this.id = id;
    this.label = label;
    this.layoutShell = shell;
  }
}
