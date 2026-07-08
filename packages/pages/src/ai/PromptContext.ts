import type { PageDefinition } from "../core/PageDefinition";

export interface PromptContext {
  promptText: string;
  contextDefinition?: PageDefinition;
  tone?: string;
  businessType?: string;
  temperature?: number;
  maxTokens?: number;
}
