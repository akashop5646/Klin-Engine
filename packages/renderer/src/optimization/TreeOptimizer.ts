import type { RenderTree } from "@klin/pages";
import { RenderTreeOptimizer } from "@klin/pages";

export class TreeOptimizer {
  private pageOptimizer = new RenderTreeOptimizer();

  optimize(tree: RenderTree): RenderTree {
    return this.pageOptimizer.optimize(tree);
  }
}
