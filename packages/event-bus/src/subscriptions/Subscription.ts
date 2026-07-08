import { KlinEvent } from "../events/KlinEvent";
import { EventFilter } from "../filters";

export interface Subscription {
  id: string;
  name: string;
  eventNamePattern: string; // e.g. "builder.*" or "*" or exact
  group?: string;
  filter?: EventFilter;
  once?: boolean;
  paused?: boolean;
  callback(event: KlinEvent): Promise<void> | void;
}
