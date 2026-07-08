import { Validator, ValidationError } from "./Validator";

export interface PerformanceBudgets {
  maxBundleSizeKb: number;
  maxStyleSizeKb: number;
  maxImageSizeKb: number;
  maxDependenciesCount: number;
}

export class PerformanceValidator extends Validator {
  private _budgets: PerformanceBudgets;

  constructor(budgets: PerformanceBudgets = { maxBundleSizeKb: 500, maxStyleSizeKb: 100, maxImageSizeKb: 1024, maxDependenciesCount: 50 }) {
    super();
    this._budgets = budgets;
  }

  public validate(target: any): ValidationError[] {
    const errors: ValidationError[] = [];

    if (target.bundleSizeKb && target.bundleSizeKb > this._budgets.maxBundleSizeKb) {
      errors.push({ code: "KLIN0310", message: `Bundle size exceeds budget: ${target.bundleSizeKb}KB > ${this._budgets.maxBundleSizeKb}KB` });
    }
    if (target.styleSizeKb && target.styleSizeKb > this._budgets.maxStyleSizeKb) {
      errors.push({ code: "KLIN0320", message: `Stylesheet size exceeds budget: ${target.styleSizeKb}KB > ${this._budgets.maxStyleSizeKb}KB` });
    }
    if (target.dependenciesCount && target.dependenciesCount > this._budgets.maxDependenciesCount) {
      errors.push({ code: "KLIN0330", message: `Total dependencies count exceeds budget: ${target.dependenciesCount} > ${this._budgets.maxDependenciesCount}` });
    }

    return errors;
  }
}
