import { z } from "zod";
import { ColorSchema } from "../../common";

export const ColorsSchema = z.object({
  primary: ColorSchema,
  secondary: ColorSchema,
  background: ColorSchema,
  foreground: ColorSchema,
  muted: ColorSchema,
  accent: ColorSchema,
});

export const ThemeTokensSchema = z.object({
  colors: ColorsSchema,
  typography: z.object({
    fontFamily: z.string().default("Inter, sans-serif"),
    fontSizeBase: z.string().default("16px"),
    lineHeightBase: z.string().default("1.5"),
  }),
  spacing: z.record(z.string(), z.string()),
  radius: z.record(z.string(), z.string()),
  border: z.record(z.string(), z.string()),
  shadow: z.record(z.string(), z.string()),
  animation: z.record(z.string(), z.string()),
  breakpoints: z.record(z.string(), z.string()),
  zIndex: z.record(z.string(), z.number()),
  opacity: z.record(z.string(), z.string()),
  transitions: z.record(z.string(), z.string()),
});
