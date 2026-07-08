export class ActionDispatcher {
  public dispatchAction(actionName: string, payload: any): void {
    console.log(`Action dispatched: [${actionName}] with payload:`, payload);
  }
}
