import { Field } from "../entities/Field";
import { Entry } from "../entities/Entry";

export class FormulaField {
  public static resolve(entry: Entry, formula: string): number {
    return Field.evaluateFormula(formula, entry.values);
  }
}
