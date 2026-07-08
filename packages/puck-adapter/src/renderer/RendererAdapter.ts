export interface RendererAdapter {
  render(componentId: string, props: any): any;
  renderHTML(componentId: string, props: any): string;
}
