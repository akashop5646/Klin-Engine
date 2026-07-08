import { z } from "zod";
import { IdSchema, TimestampSchema } from "../../common";

export const ComponentAddedEventSchema = z.object({
  type: z.literal("component:added"),
  payload: z.object({
    componentId: IdSchema,
  }),
  timestamp: TimestampSchema,
});

export const PublishedEventSchema = z.object({
  type: z.literal("published"),
  payload: z.object({
    templateId: IdSchema,
    url: z.string(),
  }),
  timestamp: TimestampSchema,
});

export const BuilderEventSchema = z.union([
  ComponentAddedEventSchema,
  PublishedEventSchema,
]);
