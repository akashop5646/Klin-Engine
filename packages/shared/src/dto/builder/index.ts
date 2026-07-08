import { JSONValue } from "../../types";

export interface SaveDraftRequest {
  pageId: string;
  layout: JSONValue;
}

export interface SaveDraftResponse {
  success: boolean;
  version: string;
  timestamp: number;
}
