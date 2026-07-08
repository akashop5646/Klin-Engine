import { KlinEvent } from "../events/KlinEvent";

export type EventFilter = (event: KlinEvent) => boolean;
