import type { RenderTree } from "@klin/pages";

export class RenderTreeHasher {
  hash(tree: RenderTree): string {
    const jsonStr = JSON.stringify(tree);
    let hash = 5381;
    for (let i = 0; i < jsonStr.length; i++) {
      hash = (hash * 33) ^ jsonStr.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
  }
}
