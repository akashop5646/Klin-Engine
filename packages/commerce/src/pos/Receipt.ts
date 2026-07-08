export class Receipt {
  public generateTextReceipt(orderId: string, total: number): string {
    return `RECEIPT FOR ORDER: ${orderId}\nTOTAL: $${total}\nTHANK YOU FOR SHOPPING!`;
  }
}
