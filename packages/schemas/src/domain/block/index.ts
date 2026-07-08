import { z } from "zod";
import { ComponentManifestSchema } from "../component";

export const BlockSchema = ComponentManifestSchema.extend({
  allowedChildren: z.array(z.string()).default([]),
});
