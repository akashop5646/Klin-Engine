export class IconResolver {
  resolveIcon(iconName: string): string {
    // Map standard icon class names (e.g. lucide-react names)
    return `lucide-${iconName.toLowerCase()}`;
  }
}
