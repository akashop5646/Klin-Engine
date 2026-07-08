import { z } from "zod";
import { IdSchema, VersionSchema } from "../../common";

export const ComponentManifestSchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  category: z.string().min(1),
  version: VersionSchema,
  editableProps: z.array(z.string()),
  variants: z.array(z.string()),
  dependencies: z.array(z.string()),
  supportsPuck: z.boolean().default(true),
  supportsAI: z.boolean().default(true),
  supportsMarketplace: z.boolean().default(true),
});
