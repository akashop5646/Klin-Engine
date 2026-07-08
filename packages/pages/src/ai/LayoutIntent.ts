export interface LayoutIntent {
  intentId: string;
  focusArea: "hero" | "features" | "pricing" | "contact" | "testimonials" | "custom";
  importanceScore: number; // 0 to 1
  description: string;
  suggestedBlockTypes?: string[];
}
