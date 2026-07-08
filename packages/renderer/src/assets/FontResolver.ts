export interface FontDefinition {
  family: string;
  source: "google" | "system" | "custom";
  url?: string;
}

export class FontResolver {
  resolveFontLink(font: FontDefinition): string {
    if (font.source === "google") {
      const familyEncoded = encodeURIComponent(font.family);
      return `https://fonts.googleapis.com/css2?family=${familyEncoded}:wght@400;700&display=swap`;
    }
    return font.url ?? "";
  }
}
