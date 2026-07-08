import type { PublishContext } from "./PublishContext";
import { Result } from "@klin/core";

export interface PublishingStage {
  id: string;
  priority: number;
  execute(context: PublishContext): Promise<Result<PublishContext, Error>>;
}
