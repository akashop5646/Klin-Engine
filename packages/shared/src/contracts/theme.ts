import { ID, Timestamp } from "../types";

export interface ThemeContract {
  id: ID;
  name: string;
  tokens: Record<string, string>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
