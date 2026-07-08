/**
 * Button Animations — configurable micro-animation presets.
 * Builder exposes these as a dropdown. AI can select appropriate animations.
 */

export type AnimationPreset = "none" | "fade" | "scale" | "bounce" | "ripple" | "pulse" | "spinner";

const animationConfigs: Record<string, { hover?: Record<string, string>; active?: Record<string, string> }> = {
  none: {},
  fade: {
    hover: { opacity: "0.85" },
    active: { opacity: "0.7" },
  },
  scale: {
    hover: { transform: "scale(1.02)" },
    active: { transform: "scale(0.97)" },
  },
  bounce: {
    hover: { transform: "translateY(-1px)" },
    active: { transform: "translateY(1px)" },
  },
  ripple: {
    active: { transform: "scale(0.97)" },
  },
  pulse: {
    hover: { animation: "klin-pulse 1.5s ease-in-out infinite" },
  },
  spinner: {},
};

/**
 * Get the animation style for the current interactive state.
 */
export function getAnimationStyle(
  preset: string,
  isHovered: boolean,
  isPressed: boolean
): Record<string, string> {
  const config = animationConfigs[preset] ?? animationConfigs.none;

  if (isPressed && config.active) {
    return config.active;
  }
  if (isHovered && config.hover) {
    return config.hover;
  }

  return {};
}

/**
 * CSS keyframes that should be injected globally once.
 */
export const buttonKeyframes = `
@keyframes klin-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes klin-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
`;
