export interface SlotDefinition {
  id: string;
  name: string;
  allowedTypes?: string[];
  maxItems?: number;
}

export class SlotManager {
  private slots: Map<string, SlotDefinition> = new Map();

  registerSlot(slot: SlotDefinition) {
    this.slots.set(slot.id, slot);
  }

  getSlot(id: string): SlotDefinition | undefined {
    return this.slots.get(id);
  }

  canAccept(slotId: string, componentType: string): boolean {
    const slot = this.slots.get(slotId);
    if (!slot) return false;
    if (!slot.allowedTypes) return true;
    return slot.allowedTypes.includes(componentType);
  }
}
