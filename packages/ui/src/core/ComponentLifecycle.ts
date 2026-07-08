/**
 * Component Lifecycle — state machine for UI component mount/update/unmount.
 * Every Klin UI component transitions through these states.
 */

export type ComponentLifecycleState =
  | "Created"
  | "Loading"
  | "Validating"
  | "ResolvingTheme"
  | "Rendering"
  | "Mounted"
  | "Updating"
  | "Unmounted"
  | "Disposed";

export class ComponentLifecycle {
  private state: ComponentLifecycleState = "Created";
  private readonly history: Array<{ from: ComponentLifecycleState; to: ComponentLifecycleState; timestamp: number }> = [];

  transitionTo(newState: ComponentLifecycleState): void {
    const from = this.state;
    this.history.push({ from, to: newState, timestamp: Date.now() });
    this.state = newState;
  }

  getState(): ComponentLifecycleState {
    return this.state;
  }

  getHistory() {
    return [...this.history];
  }
}
