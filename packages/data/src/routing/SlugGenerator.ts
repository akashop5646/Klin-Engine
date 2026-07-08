export class SlugGenerator {
  public static generate(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // remove non-word characters except dashes and spaces
      .replace(/[\s_-]+/g, "-") // replace spaces and underscores with a single dash
      .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
  }
}
