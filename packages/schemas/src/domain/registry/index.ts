import { z } from "zod";
import { IdSchema, VersionSchema } from "../../common";

export const RegistryEntrySchema = z.object({
  id: IdSchema,
  version: VersionSchema,
  category: z.string(),
  lifecycle: z.enum(["draft", "testing", "stable", "deprecated", "archived"]),
  compatibility: z.record(z.string(), z.string()),
  dependencies: z.array(z.string()),
  createdAt: z.number(),
});
