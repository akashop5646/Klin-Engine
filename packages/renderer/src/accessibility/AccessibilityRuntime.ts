export class AccessibilityRuntime {
  public ensureFocusOutline(enable: boolean): void {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("klin-focus-outline-enabled", enable);
    }
  }
}
