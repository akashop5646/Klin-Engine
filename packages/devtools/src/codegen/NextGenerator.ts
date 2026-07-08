export class NextGenerator {
  public generateNextPage(name: string, isAppDir: boolean = true): string {
    return `// Next.js Route Page\nexport default function ${name}Page() {\n  return <main><h1>${name}</h1></main>;\n}\n`;
  }
}
