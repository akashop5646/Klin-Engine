import type { PipelineContext } from "../pipeline/PipelineContext";
import { TreeOptimizer } from "./TreeOptimizer";
import { AssetOptimizer } from "./AssetOptimizer";
import { StyleOptimizer } from "./StyleOptimizer";
import { Result, Ok, Err } from "@klin/core";

export class OptimizationPipeline {
  private treeOptimizer = new TreeOptimizer();
  private assetOptimizer = new AssetOptimizer();
  private styleOptimizer = new StyleOptimizer();

  async optimize(context: PipelineContext): Promise<Result<PipelineContext, Error>> {
    try {
      // 1. Optimize Render Tree
      const optimizedTree = this.treeOptimizer.optimize(context.renderTree);

      // 2. Optimize Styles
      const optimizedStyles = this.styleOptimizer.optimizeStyles(context.compiledStyles);

      return new Ok({
        ...context,
        renderTree: optimizedTree,
        compiledStyles: optimizedStyles,
      });
    } catch (err) {
      return new Err(err as Error);
    }
  }
}
