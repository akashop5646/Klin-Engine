import { z } from "zod";
import { LayoutTreeSchema } from "../../domain/page";

export const PageTreeStateSchema = z.object({
  historyIndex: z.number().int().nonnegative().default(0),
  historyStack: z.array(LayoutTreeSchema),
});
