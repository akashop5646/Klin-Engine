import { KlinEvent } from "../events/KlinEvent";

export interface Middleware {
  beforePublish?(event: KlinEvent): Promise<KlinEvent | null>;
  afterPublish?(event: KlinEvent): Promise<void>;
  beforeDispatch?(event: KlinEvent, subscriberName: string): Promise<boolean>;
  afterDispatch?(event: KlinEvent, subscriberName: string, result: any): Promise<void>;
  onError?(event: KlinEvent, subscriberName: string, error: Error): Promise<void>;
}
