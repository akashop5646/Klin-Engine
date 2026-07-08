import { DesignState } from "../types/templates";
import { HistoryItem, PuckHistoryStack } from "../types/puck";

export class KlinPuckHistory {
  private stack: PuckHistoryStack;
  private maxHistorySize = 50;

  constructor(initialState: DesignState) {
    this.stack = {
      past: [],
      present: structuredClone(initialState),
      future: [],
    };
  }

  /**
   * Pushes a new state onto the history stack, purging future history.
   */
  public push(newState: DesignState, actionName = "Update layout"): void {
    const presentCopy = structuredClone(this.stack.present);
    const newHistoryItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      action: actionName,
      state: presentCopy,
    };

    this.stack.past.push(newHistoryItem);
    if (this.stack.past.length > this.maxHistorySize) {
      this.stack.past.shift();
    }

    this.stack.present = structuredClone(newState);
    this.stack.future = []; // Clear redo stack
  }

  /**
   * Reverts to the previous historical state if available.
   */
  public undo(): DesignState | null {
    const previousItem = this.stack.past.pop();
    if (!previousItem) {
      return null;
    }

    const currentAsFutureItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      action: previousItem.action,
      state: structuredClone(this.stack.present),
    };

    this.stack.future.unshift(currentAsFutureItem);
    this.stack.present = previousItem.state;
    return this.stack.present;
  }

  /**
   * Restores a previously undone state if available.
   */
  public redo(): DesignState | null {
    const nextItem = this.stack.future.shift();
    if (!nextItem) {
      return null;
    }

    const currentAsPastItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      action: nextItem.action,
      state: structuredClone(this.stack.present),
    };

    this.stack.past.push(currentAsPastItem);
    this.stack.present = nextItem.state;
    return this.stack.present;
  }

  public getHistoryStack(): PuckHistoryStack {
    return this.stack;
  }
}
