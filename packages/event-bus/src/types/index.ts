import { EventContext, EventMetadata } from "../events/KlinEvent";

export interface PublishOptions {
  correlationId?: string;
  causationId?: string;
  context?: EventContext;
  metadata?: Partial<EventMetadata>;
}
