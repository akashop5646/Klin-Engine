export class Inspector {
  public inspect(target: any): string {
    return JSON.stringify(target, null, 2);
  }
}
