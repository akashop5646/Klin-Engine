export interface AIPageMetadata {
  businessType: string;
  audience: string;
  tone: "professional" | "playful" | "technical" | "minimalist" | "casual";
  industry: string;
  recommendedLayouts?: string[];
  promptHints?: string[];
}
