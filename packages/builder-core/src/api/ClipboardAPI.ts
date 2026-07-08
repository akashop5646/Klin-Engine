import { ClipboardManager } from "../managers/clipboard/ClipboardManager";

export class ClipboardAPI {
  private manager: ClipboardManager;

  constructor(manager: ClipboardManager) {
    this.manager = manager;
  }

  copy(data: any) {
    this.manager.copy(data);
  }

  cut(data: any): any {
    return this.manager.cut(data);
  }

  paste(): any | null {
    return this.manager.paste();
  }

  duplicate(data: any): any {
    return this.manager.duplicate(data);
  }
}
