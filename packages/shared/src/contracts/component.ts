import { ID, Timestamp } from "../types";
import { ComponentStatus } from "../enums";

export interface ComponentContract {
  id: string; // package ID e.g. "@klin/ui/button"
  name: string;
  category: string;
  version: string;
  status: ComponentStatus;
  editableProps: string[];
  variants: string[];
  dependencies: string[];
  peerDependencies: Record<string, string>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
