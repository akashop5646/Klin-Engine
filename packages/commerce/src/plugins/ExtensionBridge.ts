export class ExtensionBridge {
  public triggerEvent(eventName: string, data: any): void {
    console.log(`ExtensionBridge triggered plugin event: ${eventName} with data:`, data);
  }
}
