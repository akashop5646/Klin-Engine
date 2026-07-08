export class InteractionRuntime {
  public captureInteraction(elementId: string, eventName: string): void {
    console.log(`Captured ${eventName} event on element ${elementId}`);
  }
}
