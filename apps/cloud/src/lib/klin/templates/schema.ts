import { z } from "zod";

export const ComponentInstanceSchema = z.object({
  id: z.string(),
  type: z.string(),
  props: z.record(z.any()),
  isVisible: z.boolean().optional(),
});

export const PageConfigSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  isVisible: z.boolean(),
  sections: z.array(ComponentInstanceSchema),
});

export const ThemeConfigSchema = z.object({
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    background: z.string(),
    surface: z.string(),
    text: z.string(),
    border: z.string().optional(),
    muted: z.string().optional(),
  }),
  typography: z.object({
    headingFont: z.string(),
    bodyFont: z.string(),
    headingSize: z.enum(["small", "default", "large"]),
    bodySize: z.enum(["small", "default", "large"]),
  }),
  buttons: z.object({
    style: z.enum(["rounded", "square", "pill"]),
    shadow: z.boolean(),
  }),
  cards: z.object({
    radius: z.number(),
    shadow: z.boolean(),
    border: z.boolean(),
  }),
  animations: z.enum(["none", "fade", "slide", "scale", "luxury", "modern"]),
});

export const DesignStateSchema = z.object({
  templateId: z.string(),
  theme: ThemeConfigSchema,
  pages: z.array(PageConfigSchema),
  version: z.number(),
  publishedAt: z.string().nullable(),
});

export const KlinTemplateMetadataSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  industry: z.string(),
  category: z.string(),
  primaryColors: z.array(z.string()),
  typography: z.object({
    headingFont: z.string(),
    bodyFont: z.string(),
  }),
  animationPresets: z.string(),
  responsiveRules: z.array(z.string()),
  themeTokens: z.array(z.string()),
  accessibilityScore: z.number(),
  performanceOptimizations: z.array(z.string()),
});

export const KlinComponentManifestSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  version: z.string(),
  variants: z.array(z.string()),
  editableProps: z.array(z.string()),
  supportsPuck: z.boolean(),
  supportsAI: z.boolean(),
  supportsMarketplace: z.boolean(),
});

