export interface PaletteAction {
  id: string;
  name: string;
  action: () => void;
}

export class CommandPalette {
  private _actions: PaletteAction[] = [];

  public register(act: PaletteAction): void {
    this._actions.push(act);
  }

  public search(query: string): PaletteAction[] {
    const term = query.toLowerCase().trim();
    if (!term) return this._actions;
    return this._actions.filter((a) => a.name.toLowerCase().includes(term));
  }
}
