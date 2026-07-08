import { Result, Ok, Err } from "@klin/core";

export interface SerializedPage {
  schemaVersion: string;
  builderVersion: string;
  pageVersion: string;
  layout: {
    root: Array<{ id: string; type: string; props: any }>;
  };
}

export class Serializer {
  static serialize(puckState: any): Result<SerializedPage, Error> {
    try {
      // 1. Normalize
      const content = puckState?.content || [];
      
      // 2. Validate
      if (!Array.isArray(content)) {
        return new Err(new Error("Invalid puckState: content must be an array"));
      }

      // 3. Convert to Page JSON structure
      const rootLayout = content.map((item: any) => ({
        id: item.id || item.props?.id || `blk_${Math.random().toString(36).substr(2, 9)}`,
        type: item.type,
        props: { ...item.props },
      }));

      // 4. Build output with versions
      const serialized: SerializedPage = {
        schemaVersion: "1.0.0",
        builderVersion: "1.0.0",
        pageVersion: "1.0.0",
        layout: {
          root: rootLayout,
        },
      };

      // 5. Optimize & Persist
      return new Ok<SerializedPage, Error>(serialized);
    } catch (err) {
      return new Err<SerializedPage, Error>(err as Error);
    }
  }
}
