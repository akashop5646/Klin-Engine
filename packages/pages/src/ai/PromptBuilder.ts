import type { PromptContext } from "./PromptContext";

export class PromptBuilder {
  buildSystemPrompt(context: PromptContext): string {
    return `You are an AI assistant designed to generate and optimize website page layouts.
Business Type: ${context.businessType ?? "General"}
Target Tone: ${context.tone ?? "Professional"}
`;
  }

  buildUserPrompt(context: PromptContext): string {
    return context.promptText;
  }
}
