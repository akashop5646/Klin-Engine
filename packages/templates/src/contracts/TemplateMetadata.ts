export interface TemplateMetadata {
  keywords: string[];
  examples?: Array<{
    title: string;
    layout: any[];
  }>;
  difficulty?: "beginner" | "intermediate" | "advanced";
  industry?: string;
  recommendedAudience?: string[];
}
