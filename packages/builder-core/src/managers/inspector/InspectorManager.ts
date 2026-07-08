import { BuilderStore } from "../../state/BuilderStore";

export class InspectorManager {
  private store: BuilderStore;

  constructor(store: BuilderStore) {
    this.store = store;
  }

  selectInspectorComponent(componentId: string | null) {
    // Component selection in inspector
  }
}
