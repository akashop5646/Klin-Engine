export class FocusManager {
  public trapFocus(container: HTMLElement): void {
    const focusable = container.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
    if (focusable.length === 0) return;
    const first = focusable[0] as HTMLElement;
    first.focus();
  }
}
