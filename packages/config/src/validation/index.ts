import { z } from "zod";

export const ConfigSchema = z.object({
  database: z.object({
    url: z.string().default("mongodb://localhost:27017/klin"),
  }),
  storage: z.object({
    bucket: z.string().min(1).default("klin-storefront-assets"),
  }),
  auth: z.object({
    secret: z.string().min(8).default("klin-development-secret-key-change-in-prod"),
  }),
  gateway: z.object({
    port: z.number().int().min(1024).max(65535).default(8000),
    url: z.string().default("http://localhost:8000"),
  }),
});

export function validateConfig(raw: any) {
  return ConfigSchema.safeParse(raw);
}
