export class BarcodeScanner {
  public scanCode(barcode: string): string {
    console.log(`Scanned barcode: ${barcode}`);
    return `sku-for-${barcode}`;
  }
}
