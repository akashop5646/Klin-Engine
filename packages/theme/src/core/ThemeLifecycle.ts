export type ThemeLifecycleState =
  | "Created"
  | "Initializing"
  | "Loading"
  | "Resolving"
  | "Compiling"
  | "Ready"
  | "Switching"
  | "Disposed";

export class ThemeLifecycle {
  private state: ThemeLifecycleState = "Created";

  transitionTo(newState: ThemeLifecycleState) {
    this.state = newState;
  }

  getState(): ThemeLifecycleState {
    return this.state;
  }
}
