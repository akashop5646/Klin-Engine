import { Timestamp } from "../types";

export interface RegistryContract {
  id: string; // package ID e.g. "@klin/ui/button"
  version: string;
  category: string;
  lifecycle: string;
  compatibility: Record<string, string>;
  dependencies: string[];
  manifest: any;
  createdAt: Timestamp;
}
