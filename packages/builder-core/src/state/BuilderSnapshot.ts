import { BuilderState } from "./BuilderState";

export class BuilderSnapshot {
  static take(state: BuilderState): string {
    return JSON.stringify(state);
  }

  static restore(serialized: string): BuilderState {
    return JSON.parse(serialized);
  }
}
