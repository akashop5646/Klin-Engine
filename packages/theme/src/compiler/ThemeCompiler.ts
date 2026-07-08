import { TokenResolver } from "../resolver/TokenResolver";

export class ThemeCompiler {
  private resolver = new TokenResolver();

  compile(theme: any, prefix = "klin"): string {
    const resolved = this.resolver.resolve(theme);
    const declarations: string[] = [];

    Object.keys(resolved.foundation.colors).forEach((color) => {
      declarations.push(`  --${prefix}-color-${color}: ${resolved.foundation.colors[color]};`);
    });

    Object.keys(resolved.foundation.spacing).forEach((space) => {
      declarations.push(`  --${prefix}-spacing-${space}: ${resolved.foundation.spacing[space]};`);
    });

    Object.keys(resolved.foundation.radius).forEach((rad) => {
      declarations.push(`  --${prefix}-radius-${rad}: ${resolved.foundation.radius[rad]};`);
    });

    Object.keys(resolved.semantic).forEach((category) => {
      Object.keys(resolved.semantic[category]).forEach((token) => {
        declarations.push(
          `  --${prefix}-${category}-${token}: ${resolved.semantic[category][token]};`
        );
      });
    });

    return declarations.join("\n");
  }
}
