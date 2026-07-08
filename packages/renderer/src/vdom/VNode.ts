export class VNode {
  public type: string;
  public props: Record<string, any>;
  public children: VNode[] = [];

  constructor(type: string, props: Record<string, any> = {}, children: VNode[] = []) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
