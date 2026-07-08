import { Entry } from "../entities/Entry";

export class ConstraintValidator {
  public static validateMinPriceDiscount(entry: Entry): { success: boolean; error?: string } {
    const price = Number(entry.values["price"] || 0);
    const discount = Number(entry.values["discount"] || 0);

    if (discount > price) {
      return { success: false, error: "Discount value cannot exceed base price" };
    }
    return { success: true };
  }
}
