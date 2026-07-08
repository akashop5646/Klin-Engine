import { z } from "zod";
import { IdSchema } from "../../common";

export const ComponentNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: IdSchema,
    type: z.string(),
    props: z.record(z.string(), z.any()),
    slots: z.record(z.string(), z.array(ComponentNodeSchema)).optional(),
  })
);

export const LayoutTreeSchema = z.object({
  root: z.array(ComponentNodeSchema),
  metadata: z.record(z.string(), z.any()).optional(),
});
