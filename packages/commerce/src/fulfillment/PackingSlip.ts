export class PackingSlip {
  public generatePackingSlip(orderId: string): string {
    return `PACKING_SLIP_PDF_RAW_DATA_FOR_${orderId}`;
  }
}
