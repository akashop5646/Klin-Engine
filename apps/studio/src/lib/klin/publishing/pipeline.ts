import { DesignState } from "../types/templates";
import { PublishPipelineEvent, PublishStatus } from "../types/publishing";
import { themeValidator } from "../theme/validator";
import { componentValidator } from "../components/validator";

export class KlinPublishPipeline {
  /**
   * Executes storefront publishing flow.
   */
  public async publish(
    state: DesignState,
    onProgress: (event: PublishPipelineEvent) => void
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // 1. Validation phase
      onProgress({ status: "validating", message: "Auditing layout theme and properties...", progress: 20 });
      const themeValidation = themeValidator.validate(state.theme);
      if (!themeValidation.valid) {
        return { success: false, error: `Theme Validation Failed: ${themeValidation.errors.join("; ")}` };
      }

      // Check all page components are registered and have correct prop types
      for (const page of state.pages) {
        for (const sec of page.sections) {
          const compCheck = componentValidator.validateProps(sec.type, sec.props);
          if (!compCheck.valid) {
            return {
              success: false,
              error: `Component Prop Validation Failed on page "${page.title}" (${sec.type}): ${compCheck.errors.join("; ")}`,
            };
          }
        }
      }

      // 2. Deploy/Upload compilation phase
      onProgress({ status: "deploying", message: "Pushing storefront assets to edge CDN...", progress: 60 });
      const response = await fetch("/api/store-design/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("kiln.auth.token") || ""}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to call publish endpoint");
      }

      const result = await response.json();

      // 3. Complete phase
      onProgress({
        status: "success",
        message: `Storefront published successfully! Version v${result.version}`,
        progress: 100,
      });

      return { success: true };
    } catch (err: any) {
      console.error("[KlinPublishPipeline] Error during publishing:", err);
      onProgress({ status: "failed", message: `Publish Failed: ${err.message}`, progress: 0 });
      return { success: false, error: err.message };
    }
  }
}

export const publishPipeline = new KlinPublishPipeline();
