import { DesignState, PageConfig, ComponentInstance } from "../types/templates";

export class KlinTemplateEngine {
  /**
   * Generates a completely new blank template state.
   */
  public createEmptyState(templateId: string): DesignState {
    return {
      templateId,
      theme: {
        colors: {
          primary: "#18181B",
          secondary: "#71717A",
          accent: "#18181B",
          background: "#FFFFFF",
          surface: "#FAFAFA",
          text: "#18181B",
        },
        typography: {
          headingFont: "Inter",
          bodyFont: "Inter",
          headingSize: "default",
          bodySize: "default",
        },
        buttons: { style: "rounded", shadow: false },
        cards: { radius: 8, shadow: true, border: false },
        animations: "fade",
      },
      pages: [
        {
          id: "home",
          title: "Home",
          slug: "home",
          isVisible: true,
          sections: [],
        },
      ],
      version: 1,
      publishedAt: null,
    };
  }

  /**
   * Adds a section to a page in the design state.
   */
  public addSection(state: DesignState, pageId: string, section: ComponentInstance): DesignState {
    const pages = state.pages.map((p) => {
      if (p.id === pageId) {
        return {
          ...p,
          sections: [...p.sections, section],
        };
      }
      return p;
    });

    return {
      ...state,
      pages,
    };
  }

  /**
   * Removes a section from a page in the design state.
   */
  public removeSection(state: DesignState, pageId: string, sectionId: string): DesignState {
    const pages = state.pages.map((p) => {
      if (p.id === pageId) {
        return {
          ...p,
          sections: p.sections.filter((s) => s.id !== sectionId),
        };
      }
      return p;
    });

    return {
      ...state,
      pages,
    };
  }
}

export const templateEngine = new KlinTemplateEngine();
