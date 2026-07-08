export class ResponsiveResolver {
  public getMediaQueries(breakpoint: string, styles: Record<string, any>): string {
    return `@media (max-width: ${breakpoint}px) { ${JSON.stringify(styles)} }`;
  }
}
