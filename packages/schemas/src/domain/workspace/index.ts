import { z } from "zod";
import { IdSchema, EmailSchema } from "../../common";

export const WorkspaceMemberSchema = z.object({
  userId: IdSchema,
  email: EmailSchema,
  role: z.enum(["owner", "admin", "manager", "staff", "developer"]),
});

export const WorkspaceSchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  ownerId: IdSchema,
  members: z.array(WorkspaceMemberSchema),
});
