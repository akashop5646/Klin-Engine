import { Result, Ok, Err } from "@klin/core";

export class Deserializer {
  static deserialize(klinPageJson: any): Result<any, Error> {
    try {
      const root = klinPageJson?.layout?.root || [];
      if (!Array.isArray(root)) {
        return new Err(new Error("Invalid Klin Page JSON: layout.root must be an array"));
      }

      const content = root.map((item: any) => ({
        type: item.type,
        props: {
          ...item.props,
          id: item.id,
        },
        id: item.id,
      }));

      return new Ok<any, Error>({
        content,
        root: {
          props: {},
        },
      });
    } catch (err) {
      return new Err<any, Error>(err as Error);
    }
  }
}
