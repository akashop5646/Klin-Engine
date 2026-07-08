import { DesignState } from "../types/templates";

export class KlinAutosaveManager {
  private timeoutId: NodeJS.Timeout | null = null;
  private debounceMs = 2000;

  /**
   * Triggers a debounced request to sync the draft design state with the server.
   */
  public triggerSave(state: DesignState, onSaveComplete?: (success: boolean) => void): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(async () => {
      try {
        const token = localStorage.getItem("kiln.auth.token");
        if (!token) {
          // If in guest mode, save to localStorage as a fallback
          localStorage.setItem("klin.guest.draft", JSON.stringify(state));
          if (onSaveComplete) onSaveComplete(true);
          return;
        }

        const response = await fetch("/api/store-design/draft", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            theme: state.theme,
            pages: state.pages,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save draft.");
        }

        if (onSaveComplete) onSaveComplete(true);
      } catch (error) {
        console.error("[KlinAutosaveManager] Error syncing draft state:", error);
        if (onSaveComplete) onSaveComplete(false);
      }
    }, this.debounceMs);
  }

  public cancelPendingSaves(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

export const autosaveManager = new KlinAutosaveManager();
