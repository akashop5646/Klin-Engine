import { DesignState, ComponentInstance } from "../types/templates";
import { AstNode } from "../types/renderer";

export class KlinAstParser {
  /**
   * Compiles the DesignState component tree into a simplified AST for indexing, SSR or validation.
   */
  public compileToAst(state: DesignState, pageId: string): AstNode[] {
    const page = state.pages.find((p) => p.id === pageId);
    if (!page) {
      console.warn(`[KlinAstParser] Page "${pageId}" not found in design state.`);
      return [];
    }

    return page.sections.map((section) => this.mapSectionToAst(section));
  }

  private mapSectionToAst(section: ComponentInstance): AstNode {
    return {
      id: section.id,
      type: section.type,
      props: { ...section.props },
      // Sections can contain children in advanced nested grid models
      children: Array.isArray(section.props.items)
        ? (section.props.items as any[])
            .filter((item) => item && typeof item === "object")
            .map((item, idx) => ({
              id: item.id || `${section.id}-item-${idx}`,
              type: "sub-element",
              props: item,
            }))
        : undefined,
    };
  }
}

export const astParser = new KlinAstParser();
