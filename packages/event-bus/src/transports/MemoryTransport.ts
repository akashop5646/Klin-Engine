import { Transport } from "./Transport";
import { KlinEvent } from "../events/KlinEvent";

export class MemoryTransport implements Transport {
  private callbacks: Array<(event: KlinEvent) => Promise<void> | void> = [];

  async publish(event: KlinEvent): Promise<void> {
    for (const callback of this.callbacks) {
      await callback(event);
    }
  }

  subscribe(callback: (event: KlinEvent) => Promise<void> | void): void {
    this.callbacks.push(callback);
  }
}
