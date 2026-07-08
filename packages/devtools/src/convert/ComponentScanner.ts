export class ComponentScanner {
  public scan(dirPath: string): string[] {
    console.log(`Scanning React files inside directory: ${dirPath}`);
    return ["Button.tsx", "Hero.tsx", "Card.tsx"];
  }
}
