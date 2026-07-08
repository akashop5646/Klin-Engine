import { ID, Timestamp } from "../types";

export interface TemplateContract {
  id: ID;
  name: string;
  category: string;
  version: string;
  layout: import("../types").JSONValue;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
