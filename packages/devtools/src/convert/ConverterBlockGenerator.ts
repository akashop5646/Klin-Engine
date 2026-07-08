export class ConverterBlockGenerator {
  public generateBlockSchema(name: string, props: Record<string, any>): string {
    return JSON.stringify({
      name,
      category: "Custom",
      properties: Object.keys(props).map(key => ({
        name: key,
        type: typeof props[key]
      }))
    }, null, 2);
  }
}
