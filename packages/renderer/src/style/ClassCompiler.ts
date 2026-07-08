export class ClassCompiler {
  public compileClasses(classNames: string[]): string {
    return classNames.filter(Boolean).map((c) => c.trim()).join(" ");
  }
}
