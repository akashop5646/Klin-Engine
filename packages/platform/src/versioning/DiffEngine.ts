export class DiffEngine {
  public computeDiff(layoutA: any, layoutB: any): any {
    console.log(`DiffEngine computing layout changes...`);
    return {
      added: [],
      removed: [],
      modified: [],
    };
  }
}
