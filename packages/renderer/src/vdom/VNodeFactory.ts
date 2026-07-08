import { VNode } from "./VNode";

export class VNodeFactory {
  public static create(type: string, props: Record<string, any> = {}, children: VNode[] = []): VNode {
    return new VNode(type, props, children);
  }
}
