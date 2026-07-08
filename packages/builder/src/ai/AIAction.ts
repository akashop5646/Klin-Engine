export interface AISuggestedEdit {
  actionType: "Insert" | "Modify" | "Delete";
  targetBlockId?: string;
  payload: Record<string, any>;
}

export class AIAction {
  public executeAction(edit: AISuggestedEdit): void {
    // Translates AI model adjustments into workspace layout commands
  }
}
