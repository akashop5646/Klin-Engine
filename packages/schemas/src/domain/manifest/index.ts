import { z } from "zod";
import { IdSchema, VersionSchema } from "../../common";

export const PackageManifestSchema = z.object({
  name: z.string().min(1),
  version: VersionSchema,
  description: z.string(),
  author: z.string(),
  license: z.string(),
  type: z.enum(["component", "block", "template", "theme", "plugin", "extension", "marketplace-package"]),
  dependencies: z.record(z.string(), z.string()).optional(),
  peerDependencies: z.record(z.string(), z.string()).optional(),
});
