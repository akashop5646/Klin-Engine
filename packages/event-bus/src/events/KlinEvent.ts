import { Priority } from "../priority";

export interface EventContext {
  projectId?: string;
  workspaceId?: string;
  userId?: string;
  sessionId?: string;
  traceId?: string;
}

export interface EventMetadata {
  createdAt: number;
  publishedAt: number;
  dispatchedAt?: number;
  completedAt?: number;
  duration?: number;
  retryCount: number;
  priority: Priority;
}

export interface KlinEvent<T = any> {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly timestamp: number;
  readonly source: string;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly context: EventContext;
  readonly metadata: EventMetadata;
  readonly payload: T;
}
