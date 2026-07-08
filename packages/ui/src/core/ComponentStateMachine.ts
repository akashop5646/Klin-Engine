/**
 * Component Runtime State Machine — tracks interactive state of a rendered component.
 * AI and the Builder can inspect these states at any time.
 */

export type ComponentRuntimeState =
  | "Idle"
  | "Hover"
  | "Focused"
  | "Pressed"
  | "Loading"
  | "Disabled";

export class ComponentStateMachine {
  private state: ComponentRuntimeState = "Idle";
  private listeners: Array<(from: ComponentRuntimeState, to: ComponentRuntimeState) => void> = [];

  transitionTo(newState: ComponentRuntimeState): void {
    const from = this.state;
    if (from === newState) return;
    this.state = newState;
    for (const listener of this.listeners) {
      listener(from, newState);
    }
  }

  getState(): ComponentRuntimeState {
    return this.state;
  }

  onTransition(listener: (from: ComponentRuntimeState, to: ComponentRuntimeState) => void): void {
    this.listeners.push(listener);
  }
}
