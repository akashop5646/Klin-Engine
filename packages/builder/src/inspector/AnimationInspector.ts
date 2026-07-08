export interface BasicAnimationConfig {
  type: "fade" | "slide" | "zoom";
  delayMs: number;
  durationMs: number;
}

export class AnimationInspector {
  public applyBasicAnimation(blockId: string, config: BasicAnimationConfig): void {
    // Configures component base entry animations
  }
}
