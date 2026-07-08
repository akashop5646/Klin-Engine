export class DynamicBindingPanel {
  public selectBindingSource(propKey: string): string {
    // Selects a schema value e.g. "product.title" to output bound parameter
    return `{{${propKey}}}`;
  }
}
