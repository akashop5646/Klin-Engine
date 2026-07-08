export class MergeManager {
  public mergeLayouts(base: any, local: any, remote: any): any {
    console.log(`MergeManager merging conflict commits...`);
    return Object.assign({}, base, remote, local);
  }
}
