import { z } from "zod";

export type FieldType =
  | "Text"
  | "Textarea"
  | "RichText"
  | "Markdown"
  | "Boolean"
  | "Number"
  | "Color"
  | "Date"
  | "Time"
  | "Slug"
  | "Email"
  | "Phone"
  | "Password"
  | "Image"
  | "Video"
  | "Gallery"
  | "Reference"
  | "Repeater"
  | "Object"
  | "JSON"
  | "Code"
  | "URL"
  | "Rating"
  | "Money"
  | "Formula";

export interface FieldDefinition {
  name: string;
  type: FieldType;
  required?: boolean;
  defaultValue?: any;
  validationRules?: {
    min?: number;
    max?: number;
    regex?: string;
  };
  formula?: string; // used if type is "Formula"
}

export class Field {
  public static validate(def: FieldDefinition, value: any): { success: boolean; error?: string } {
    if (def.required && (value === undefined || value === null || value === "")) {
      return { success: false, error: `${def.name} is required` };
    }

    let schema: z.ZodTypeAny = z.any();

    switch (def.type) {
      case "Text":
      case "Textarea":
      case "RichText":
      case "Markdown":
      case "Slug":
      case "Color":
      case "Code":
        schema = z.string();
        break;
      case "Email":
        schema = z.string().email();
        break;
      case "URL":
        schema = z.string().url();
        break;
      case "Boolean":
        schema = z.boolean();
        break;
      case "Number":
      case "Rating":
      case "Money":
        schema = z.number();
        break;
      case "Date":
      case "Time":
        schema = z.union([z.string(), z.date()]);
        break;
      default:
        schema = z.any();
    }

    const result = schema.safeParse(value);
    if (!result.success) {
      return { success: false, error: result.error.errors[0]?.message || "Invalid type" };
    }

    return { success: true };
  }

  public static evaluateFormula(formula: string, context: Record<string, any>): number {
    try {
      // Basic expression evaluation by interpolating context variables
      // Interpolate patterns like {{price}} or raw context values
      let evaluatedExpr = formula.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
        const val = context[key.trim()];
        return val !== undefined ? String(val) : "0";
      });

      // Also replace plain word keys with values
      Object.keys(context).forEach((key) => {
        const regex = new RegExp(`\\b${key}\\b`, "g");
        evaluatedExpr = evaluatedExpr.replace(regex, String(context[key]));
      });

      // Clean check against malicious strings
      if (/[^0-9+\-*/().\s]/.test(evaluatedExpr)) {
        throw new Error("Invalid formula characters");
      }

      // Safe JS eval for numbers math
      const fn = new Function(`return (${evaluatedExpr});`);
      return Number(fn());
    } catch (e) {
      console.error("Formula evaluation failed:", e);
      return 0;
    }
  }
}
