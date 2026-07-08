import { ID, Timestamp } from "../types";

export interface WorkspaceContract {
  id: ID;
  name: string;
  ownerId: ID;
  members: Array<{ userId: ID; role: string }>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
