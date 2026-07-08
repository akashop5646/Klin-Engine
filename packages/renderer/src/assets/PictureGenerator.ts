export class PictureGenerator {
  public generatePictureTag(url: string, srcSet: Record<number, string>): string {
    const sources = Object.entries(srcSet)
      .map(([width, src]) => `<source media="(max-width: ${width}px)" srcset="${src}" />`)
      .join("\n");
    return `<picture>\n${sources}\n<img src="${url}" loading="lazy" />\n</picture>`;
  }
}
