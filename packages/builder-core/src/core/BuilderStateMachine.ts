import { BuilderLifecycle, LifecycleState } from "./BuilderLifecycle";

export class BuilderStateMachine {
  private lifecycle: BuilderLifecycle;

  constructor(lifecycle: BuilderLifecycle) {
    this.lifecycle = lifecycle;
  }

  transitionTo(state: LifecycleState) {
    this.lifecycle.transitionTo(state);
  }
}
