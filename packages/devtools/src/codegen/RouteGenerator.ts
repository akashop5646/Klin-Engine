export class RouteGenerator {
  public generateRouteHandler(routePath: string, methods: string[] = ["GET"]): string {
    const handlerFns = methods.map(m => `export async function ${m}(request: Request) {\n  return new Response("Klin Router: ${routePath}");\n}`).join("\n\n");
    return `// Router handlers endpoints\n${handlerFns}\n`;
  }
}
