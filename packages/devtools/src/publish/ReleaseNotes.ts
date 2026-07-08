export class ReleaseNotes {
  public generate(pkgName: string, version: string, changes: string[]): string {
    return `# Release Notes - ${pkgName}@${version}\n\n## Changes:\n${changes.map(c => `- ${c}`).join("\n")}\n`;
  }
}
