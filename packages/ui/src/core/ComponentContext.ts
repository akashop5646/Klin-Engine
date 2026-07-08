/**
 * Component Context — the standardized context every Klin UI component receives.
 * No component reads global state. Everything is injected through context.
 */

import { EventBus } from "@klin/event-bus";

export interface ComponentContext {
  /** Theme context reference */
  theme: {
    themeId: string;
    mode: "Light" | "Dark" | "HighContrast" | "Print" | "Editor";
    scope: string;
  };

  /** Builder context — only populated when rendered inside the builder */
  builder: {
    isEditing: boolean;
    isSelected: boolean;
    isDragging: boolean;
  } | null;

  /** Viewport and device info */
  viewport: "mobile" | "tablet" | "desktop";
  device: string;

  /** Platform the component is rendering on */
  platform: "Builder" | "Preview" | "Storefront";

  /** Project identifiers */
  projectId: string;
  workspaceId: string;

  /** Internationalization */
  locale: string;
  direction: "ltr" | "rtl";

  /** Platform services — available without globals */
  eventBus: EventBus | null;
  logger: {
    info: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string) => void;
  } | null;
  permissions: Record<string, boolean>;
  featureFlags: Record<string, boolean>;
}

/** Default context for standalone rendering outside the platform */
export const defaultComponentContext: ComponentContext = {
  theme: { themeId: "", mode: "Light", scope: ":root" },
  builder: null,
  viewport: "desktop",
  device: "unknown",
  platform: "Storefront",
  projectId: "",
  workspaceId: "",
  locale: "en",
  direction: "ltr",
  eventBus: null,
  logger: null,
  permissions: {},
  featureFlags: {},
};
