export interface GenerationHints {
  preferredLayoutMode?: "grid" | "flex" | "absolute";
  spacingDensity?: "compact" | "cozy" | "spacious";
  colorHarmonyScheme?: "monochromatic" | "analogous" | "complementary" | "triadic";
  maxElementsCount?: number;
  forbiddenBlockIds?: string[];
}
