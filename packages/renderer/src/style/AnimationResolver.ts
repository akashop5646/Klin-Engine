export class AnimationResolver {
  public resolveKeyframes(timeline: any[]): Record<string, any> {
    return { animationName: "klin-keyframes-timeline", animationDuration: "1s" };
  }
}
