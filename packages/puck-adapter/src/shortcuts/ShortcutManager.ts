export type ShortcutCallback = (e: KeyboardEvent) => void;

export class ShortcutManager {
  private shortcuts: Map<string, ShortcutCallback> = new Map();
  private isBound = false;

  register(keys: string, callback: ShortcutCallback) {
    // Normalise keys, e.g., 'ctrl+z'
    const normalized = keys.toLowerCase().replace(/\s+/g, "");
    this.shortcuts.set(normalized, callback);
  }

  unregister(keys: string) {
    const normalized = keys.toLowerCase().replace(/\s+/g, "");
    this.shortcuts.delete(normalized);
  }

  bind() {
    if (this.isBound) return;
    window.addEventListener("keydown", this.handleKeyDown);
    this.isBound = true;
  }

  unbind() {
    if (!this.isBound) return;
    window.removeEventListener("keydown", this.handleKeyDown);
    this.isBound = false;
    this.shortcuts.clear();
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const keys: string[] = [];
    if (e.ctrlKey || e.metaKey) keys.push("ctrl");
    if (e.shiftKey) keys.push("shift");
    if (e.altKey) keys.push("alt");
    
    const key = e.key.toLowerCase();
    if (key !== "control" && key !== "meta" && key !== "shift" && key !== "alt") {
      keys.push(key);
    }

    const shortcutStr = keys.join("+");
    const callback = this.shortcuts.get(shortcutStr);
    if (callback) {
      e.preventDefault();
      callback(e);
    }
  };
}
