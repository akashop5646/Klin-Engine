export interface InspectorBindingState {
  mode: "static" | "dynamic";
  staticValue: any;
  dynamicBindingPath?: string; // e.g. "product.title"
}

export class InspectorBinding {
  public static toExpression(state: InspectorBindingState): any {
    if (state.mode === "dynamic" && state.dynamicBindingPath) {
      return `{{${state.dynamicBindingPath}}}`;
    }
    return state.staticValue;
  }

  public static fromExpression(value: any): InspectorBindingState {
    if (typeof value === "string" && value.startsWith("{{") && value.endsWith("}}")) {
      return {
        mode: "dynamic",
        staticValue: "",
        dynamicBindingPath: value.slice(2, -2).trim(),
      };
    }
    return {
      mode: "static",
      staticValue: value,
    };
  }
}
