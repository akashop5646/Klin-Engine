import { z } from "zod";
import { IdSchema } from "../../common";

export const SelectionSchema = z.object({
  selectedNodeId: IdSchema.nullable(),
  hoveredNodeId: IdSchema.nullable(),
});
