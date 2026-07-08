import { Entry } from "../entities/Entry";

export class ComputedField {
  public static getComputedValue(entry: Entry, fieldName: string): any {
    switch (fieldName) {
      case "priceAfterDiscount": {
        const price = Number(entry.values["price"] || 0);
        const discount = Number(entry.values["discount"] || 0);
        return Math.max(0, price - discount);
      }
      case "averageRating": {
        const ratings: number[] = entry.values["ratings"] || [];
        if (!ratings.length) return 0;
        const total = ratings.reduce((sum, r) => sum + r, 0);
        return total / ratings.length;
      }
      case "stockStatus": {
        const stock = Number(entry.values["stock"] || 0);
        return stock > 0 ? "In Stock" : "Out of Stock";
      }
      default:
        return entry.values[fieldName];
    }
  }
}
