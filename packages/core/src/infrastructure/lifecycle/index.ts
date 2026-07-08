export type LifecycleState =
  | "Created"
  | "Initialized"
  | "Starting"
  | "Ready"
  | "Stopping"
  | "Disposed";

export interface ILifecycle {
  state: LifecycleState;
  initialize(): Promise<void>;
  start(): Promise<void>;
  ready(): Promise<void>;
  stop(): Promise<void>;
  dispose(): Promise<void>;
}

export class LifecycleTracker implements ILifecycle {
  private _state: LifecycleState = "Created";

  public get state(): LifecycleState {
    return this._state;
  }

  private transitionTo(nextState: LifecycleState) {
    const validTransitions: Record<LifecycleState, LifecycleState[]> = {
      Created: ["Initialized", "Disposed"],
      Initialized: ["Starting", "Stopping", "Disposed"],
      Starting: ["Ready", "Stopping", "Disposed"],
      Ready: ["Stopping", "Disposed"],
      Stopping: ["Disposed", "Created"],
      Disposed: []
    };

    const allowed = validTransitions[this._state];
    if (!allowed.includes(nextState)) {
      throw new Error(`Invalid lifecycle transition from ${this._state} to ${nextState}`);
    }
    this._state = nextState;
  }

  async initialize(): Promise<void> {
    this.transitionTo("Initialized");
  }

  async start(): Promise<void> {
    this.transitionTo("Starting");
  }

  async ready(): Promise<void> {
    this.transitionTo("Ready");
  }

  async stop(): Promise<void> {
    this.transitionTo("Stopping");
  }

  async dispose(): Promise<void> {
    this._state = "Disposed";
  }
}
