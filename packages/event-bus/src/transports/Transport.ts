import { KlinEvent } from "../events/KlinEvent";

export interface Transport {
  publish(event: KlinEvent): Promise<void>;
  subscribe(callback: (event: KlinEvent) => Promise<void> | void): void;
}
