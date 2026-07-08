import { DesignState } from "./templates";

export type PublishStatus = "idle" | "validating" | "deploying" | "success" | "failed";

export interface PublishPipelineEvent {
  status: PublishStatus;
  message: string;
  progress: number;
}

export interface PublishManifest {
  version: number;
  publishedAt: string;
  authorEmail?: string;
  designState: DesignState;
  assets: string[];
}

export interface RollbackOptions {
  version: number;
  userId: string;
}
