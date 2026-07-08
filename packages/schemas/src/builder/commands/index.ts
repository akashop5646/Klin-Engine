import { z } from "zod";
import { IdSchema } from "../../common";

export const AddSectionCommandSchema = z.object({
  type: z.literal("ADD_SECTION"),
  payload: z.object({
    blockId: IdSchema,
    index: z.number().int().nonnegative(),
  }),
});

export const DeleteSectionCommandSchema = z.object({
  type: z.literal("DELETE_SECTION"),
  payload: z.object({
    sectionId: IdSchema,
  }),
});

export const MoveSectionCommandSchema = z.object({
  type: z.literal("MOVE_SECTION"),
  payload: z.object({
    sectionId: IdSchema,
    newIndex: z.number().int().nonnegative(),
  }),
});

export const UpdatePropsCommandSchema = z.object({
  type: z.literal("UPDATE_PROPS"),
  payload: z.object({
    nodeId: IdSchema,
    props: z.record(z.string(), z.any()),
  }),
});

export const DuplicateCommandSchema = z.object({
  type: z.literal("DUPLICATE"),
  payload: z.object({
    nodeId: IdSchema,
  }),
});

export const CommandSchema = z.discriminatedUnion("type", [
  AddSectionCommandSchema,
  DeleteSectionCommandSchema,
  MoveSectionCommandSchema,
  UpdatePropsCommandSchema,
  DuplicateCommandSchema,
]);
