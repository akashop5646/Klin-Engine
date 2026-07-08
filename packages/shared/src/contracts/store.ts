import { ID, Timestamp } from "../types";

export interface StoreContract {
  id: ID;
  name: string;
  domain: string;
  currency: string;
  language: string;
  timezone: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
