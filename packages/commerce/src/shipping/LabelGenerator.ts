export class LabelGenerator {
  public generateLabelPDF(shipmentId: string): string {
    return `BASE64_PDF_LABEL_FOR_${shipmentId}`;
  }
}
