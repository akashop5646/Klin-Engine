import { BuilderSchema } from "./types";
import { PuckFieldMapper } from "./PuckFieldMapper";
import { RendererAdapter } from "../renderer/RendererAdapter";

export class ComponentMapper {
  static map(schema: BuilderSchema, renderer: RendererAdapter): any {
    const defaultProps: Record<string, any> = {};
    for (const field of schema.fields) {
      if (field.defaultValue !== undefined) {
        defaultProps[field.id] = field.defaultValue;
      }
    }

    return {
      fields: PuckFieldMapper.mapFields(schema.fields),
      defaultProps,
      render: (props: any) => {
        return renderer.render(schema.componentId, props);
      },
    };
  }
}
