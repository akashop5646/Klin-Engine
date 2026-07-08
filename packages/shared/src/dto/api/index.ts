import { JSONValue } from "../../types";

export interface PaginationRequest {
  limit: number;
  offset: number;
}

export interface PaginationResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface SearchRequest {
  query: string;
  filters?: Record<string, string[]>;
}

export interface ApiResponse<T = JSONValue> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any;
  };
}
