import type { RenderProps } from "./RenderProps";
import type { RenderSlots } from "./RenderSlots";

export interface RenderNode {
  id: string;
  blockId: string;
  props: RenderProps;
  children?: RenderNode[];
  slots?: RenderSlots;
  metadata?: Record<string, unknown>;
}
