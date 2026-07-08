export class KeyboardNavigation {
  public registerKeydownListener(handler: (key: string) => void): () => void {
    if (typeof window === "undefined") return () => {};
    const listener = (e: KeyboardEvent) => handler(e.key);
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }
}
