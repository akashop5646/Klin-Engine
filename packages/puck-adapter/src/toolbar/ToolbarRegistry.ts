import { ToolbarAction } from "./ToolbarAction";

export class ToolbarRegistry {
  private actions: Map<string, ToolbarAction> = new Map();

  register(action: ToolbarAction) {
    if (this.actions.has(action.id)) {
      throw new Error(`Toolbar action with ID "${action.id}" already registered`);
    }
    this.actions.set(action.id, action);
  }

  unregister(actionId: string) {
    this.actions.delete(actionId);
  }

  getAction(actionId: string): ToolbarAction | undefined {
    return this.actions.get(actionId);
  }

  listActions(): ToolbarAction[] {
    return Array.from(this.actions.values());
  }
}
