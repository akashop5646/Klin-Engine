import { Preferences } from "./Preferences";
import { BreakpointDevice } from "./BreakpointManager";

export interface BuilderContextConfig {
  websiteId: string;
  activePageId?: string;
  templateId?: string;
  themeId?: string;
  locale?: string;
}

export class BuilderContext {
  public readonly websiteId: string;
  public activePageId?: string;
  public templateId?: string;
  public themeId?: string;
  public locale: string;
  public activeDevice: BreakpointDevice = "Desktop";
  public readonly preferences: Preferences = new Preferences();
  public historyIndex: number = -1;

  constructor(config: BuilderContextConfig) {
    this.websiteId = config.websiteId;
    this.activePageId = config.activePageId;
    this.templateId = config.templateId;
    this.themeId = config.themeId;
    this.locale = config.locale || "en";
  }
}
