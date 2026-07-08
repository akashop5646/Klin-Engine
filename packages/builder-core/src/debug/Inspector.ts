import { BuilderStore } from "../state/BuilderStore";

export class Inspector {
  private store: BuilderStore;

  constructor(store: BuilderStore) {
    this.store = store;
  }

  dump(): string {
    return JSON.stringify(this.store.getState(), null, 2);
  }
}
