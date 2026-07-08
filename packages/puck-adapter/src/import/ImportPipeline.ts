import { Result, Ok, Err } from "@klin/core";

export class ImportPipeline {
  static ingest(raw: string): Result<any, Error> {
    try {
      const parsed = JSON.parse(raw);
      
      // Basic validation checks
      if (!parsed.schemaVersion) {
        // Handle conversion of legacy configurations if necessary
        parsed.schemaVersion = "1.0.0";
      }

      // Output normalised canvas configuration
      return new Ok<any, Error>({
        version: parsed.schemaVersion,
        pages: parsed.pages || [],
        theme: parsed.theme || {},
      });
    } catch (err) {
      return new Err<any, Error>(err as Error);
    }
  }
}
