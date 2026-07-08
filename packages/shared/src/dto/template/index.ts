import { JSONValue } from "../../types";

export interface ValidateTemplateRequest {
  layout: JSONValue;
}

export interface ValidateTemplateResponse {
  valid: boolean;
  errors?: string[];
}
