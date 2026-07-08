export class PickingList {
  public generatePickingList(orderId: string): string[] {
    return [`item-1-for-${orderId}`, `item-2-for-${orderId}`];
  }
}
