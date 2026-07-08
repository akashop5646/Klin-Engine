export class CommerceInspector {
  public inspectStateSize(stateObj: any): number {
    return JSON.stringify(stateObj).length;
  }
}
