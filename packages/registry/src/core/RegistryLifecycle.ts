export type RegistryLifecycleState =
  | "Created"
  | "Initializing"
  | "Loading"
  | "Ready"
  | "Reloading"
  | "Stopped"
  | "Disposed";

export class RegistryLifecycle {
  private state: RegistryLifecycleState = "Created";

  transitionTo(newState: RegistryLifecycleState) {
    this.state = newState;
  }

  getState(): RegistryLifecycleState {
    return this.state;
  }
}
