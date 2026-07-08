import type { PageInstance } from "../core/PageFactory";
import type { RenderTree } from "../render-tree/RenderTree";
import { PagePipeline } from "../pipeline/PagePipeline";
import { PageDependencyResolver } from "../composition/PageDependencyResolver";
import { OverrideResolver } from "../composition/OverrideResolver";
import { RenderTreeOptimizer } from "../render-tree/RenderTreeOptimizer";
import { PageValidator } from "./PageValidator";
import { Result, Ok, Err } from "@klin/core";

export class PageRenderer {
  private pipeline: PagePipeline;

  constructor() {
    this.pipeline = new PagePipeline();

    // Stage 1: Dependency resolution
    this.pipeline.addStage({
      id: "DependencyResolution",
      priority: 10,
      execute: async (ctx) => {
        const resolver = new PageDependencyResolver(ctx.pageInstance.context.registry);
        const depRes = await resolver.resolve(ctx.pageInstance.definition);
        if (!depRes.ok) return new Err(depRes.error);
        return new Ok({ ...ctx, dependencies: depRes.value });
      },
    });

    // Stage 2: Merge overrides and build initial tree
    this.pipeline.addStage({
      id: "OverrideResolution",
      priority: 20,
      execute: async (ctx) => {
        const resolver = new OverrideResolver();
        const templateId = ctx.pageInstance.definition.templateId;
        const templateRes = await ctx.pageInstance.context.registry.resolve("template", templateId);
        
        let templateLayout: any[] = [];
        if (templateRes && (templateRes as any).getLayout) {
          templateLayout = (templateRes as any).getLayout();
        } else if (templateRes && (templateRes as any).layout) {
          templateLayout = (templateRes as any).layout;
        }

        const mergedBlocks = resolver.resolve(
          templateLayout,
          ctx.pageInstance.definition.overrides
        );

        // Map blocks to RenderNode schema structure
        const rootNodes = mergedBlocks.map((block) => ({
          id: block.id,
          blockId: block.blockId,
          props: block.properties,
        }));

        const initialTree: RenderTree = {
          version: "1.0.0",
          generatedAt: Date.now(),
          pageId: ctx.pageInstance.definition.manifest.id,
          templateId: templateId,
          themeId: ctx.pageInstance.context.page.permissions.visibility === "public" ? "default-theme" : "draft-theme",
          locale: ctx.pageInstance.context.locale || "en",
          rendererVersion: "1.0.0",
          pipelineVersion: "1.0.0",
          root: rootNodes,
        };

        return new Ok({ ...ctx, renderTree: initialTree });
      },
    });

    // Stage 3: Validation report
    this.pipeline.addStage({
      id: "Validation",
      priority: 30,
      execute: async (ctx) => {
        const validator = new PageValidator();
        const reportRes = await validator.validate(ctx.pageInstance);
        if (!reportRes.ok) return new Err(reportRes.error);
        return new Ok({ ...ctx, validationReport: reportRes.value });
      },
    });

    // Stage 4: Render Tree Optimization
    this.pipeline.addStage({
      id: "Optimization",
      priority: 40,
      execute: async (ctx) => {
        if (!ctx.renderTree) {
          return new Err(new Error("RenderTree not found for optimization stage."));
        }
        const optimizer = new RenderTreeOptimizer();
        const optimizedTree = optimizer.optimize(ctx.renderTree);
        return new Ok({ ...ctx, renderTree: optimizedTree });
      },
    });
  }

  async render(pageInstance: PageInstance): Promise<Result<RenderTree, Error>> {
    pageInstance.lifecycle.transitionTo("Rendering" as any);

    const pipeRes = await this.pipeline.execute(pageInstance);
    if (!pipeRes.ok) {
      return new Err(pipeRes.error);
    }

    const tree = pipeRes.value.renderTree;
    if (!tree) {
      return new Err(new Error("Render tree compilation was not completed."));
    }

    pageInstance.context.eventBus?.getPublisher().publish(
      "page.render-tree.generated",
      { pageId: pageInstance.definition.manifest.id },
      "pages"
    );

    return new Ok(tree);
  }
}
