import { BlockInstance } from "../core/BlockFactory";

export class BlockSerializer {
  serialize(instance: BlockInstance): string {
    return JSON.stringify({
      manifestId: instance.manifest.id,
      name: instance.manifest.name,
      category: instance.manifest.category,
      properties: instance.getProperties(),
      version: instance.manifest.version,
    });
  }
}
