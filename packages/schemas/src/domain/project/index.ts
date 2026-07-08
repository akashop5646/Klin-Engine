import { z } from "zod";
import { IdSchema, SlugSchema } from "../../common";

export const ProjectSchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  slug: SlugSchema,
  domain: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});
