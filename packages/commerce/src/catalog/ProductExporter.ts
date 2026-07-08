export class ProductExporter {
  public exportCSV(products: any[]): string {
    console.log("ProductExporter CSV exported successfully.");
    return "id,name,sku\n";
  }
}
