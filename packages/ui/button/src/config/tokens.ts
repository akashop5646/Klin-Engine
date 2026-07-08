/**
 * Button Tokens — component-level token map binding to semantic theme tokens.
 * Every token path references a semantic role, never a raw color.
 *
 * Structure: button.<variant>.<state>.<property>
 */

export const buttonTokens = {
  primary: {
    idle: {
      background: "var(--klin-brand-primary)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-brand-primary)",
    },
    hover: {
      background: "var(--klin-interaction-hover)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-interaction-hover)",
    },
    active: {
      background: "var(--klin-brand-secondary)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-brand-secondary)",
    },
    disabled: {
      background: "var(--klin-surface-card)",
      text: "var(--klin-text-muted)",
      border: "var(--klin-border-default)",
    },
    focus: {
      ring: "var(--klin-brand-primary)",
    },
  },
  secondary: {
    idle: {
      background: "var(--klin-surface-card)",
      text: "var(--klin-text-primary)",
      border: "var(--klin-border-default)",
    },
    hover: {
      background: "var(--klin-interaction-hover)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-interaction-hover)",
    },
    active: {
      background: "var(--klin-brand-secondary)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-brand-secondary)",
    },
    disabled: {
      background: "var(--klin-surface-card)",
      text: "var(--klin-text-muted)",
      border: "var(--klin-border-default)",
    },
    focus: {
      ring: "var(--klin-brand-primary)",
    },
  },
  outline: {
    idle: {
      background: "transparent",
      text: "var(--klin-brand-primary)",
      border: "var(--klin-brand-primary)",
    },
    hover: {
      background: "var(--klin-brand-primary)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-brand-primary)",
    },
    active: {
      background: "var(--klin-brand-secondary)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-brand-secondary)",
    },
    disabled: {
      background: "transparent",
      text: "var(--klin-text-muted)",
      border: "var(--klin-border-default)",
    },
    focus: {
      ring: "var(--klin-brand-primary)",
    },
  },
  ghost: {
    idle: {
      background: "transparent",
      text: "var(--klin-text-primary)",
      border: "transparent",
    },
    hover: {
      background: "var(--klin-surface-card)",
      text: "var(--klin-text-primary)",
      border: "transparent",
    },
    active: {
      background: "var(--klin-border-default)",
      text: "var(--klin-text-primary)",
      border: "transparent",
    },
    disabled: {
      background: "transparent",
      text: "var(--klin-text-muted)",
      border: "transparent",
    },
    focus: {
      ring: "var(--klin-brand-primary)",
    },
  },
  link: {
    idle: {
      background: "transparent",
      text: "var(--klin-brand-primary)",
      border: "transparent",
    },
    hover: {
      background: "transparent",
      text: "var(--klin-interaction-hover)",
      border: "transparent",
    },
    active: {
      background: "transparent",
      text: "var(--klin-brand-secondary)",
      border: "transparent",
    },
    disabled: {
      background: "transparent",
      text: "var(--klin-text-muted)",
      border: "transparent",
    },
    focus: {
      ring: "var(--klin-brand-primary)",
    },
  },
  success: {
    idle: {
      background: "var(--klin-status-success, #22c55e)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-status-success, #22c55e)",
    },
    hover: {
      background: "var(--klin-status-success-hover, #16a34a)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-status-success-hover, #16a34a)",
    },
    active: {
      background: "var(--klin-status-success-hover, #16a34a)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-status-success-hover, #16a34a)",
    },
    disabled: {
      background: "var(--klin-surface-card)",
      text: "var(--klin-text-muted)",
      border: "var(--klin-border-default)",
    },
    focus: {
      ring: "var(--klin-status-success, #22c55e)",
    },
  },
  warning: {
    idle: {
      background: "var(--klin-status-warning, #f59e0b)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-status-warning, #f59e0b)",
    },
    hover: {
      background: "var(--klin-status-warning-hover, #d97706)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-status-warning-hover, #d97706)",
    },
    active: {
      background: "var(--klin-status-warning-hover, #d97706)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-status-warning-hover, #d97706)",
    },
    disabled: {
      background: "var(--klin-surface-card)",
      text: "var(--klin-text-muted)",
      border: "var(--klin-border-default)",
    },
    focus: {
      ring: "var(--klin-status-warning, #f59e0b)",
    },
  },
  danger: {
    idle: {
      background: "var(--klin-status-danger, #ef4444)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-status-danger, #ef4444)",
    },
    hover: {
      background: "var(--klin-status-danger-hover, #dc2626)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-status-danger-hover, #dc2626)",
    },
    active: {
      background: "var(--klin-status-danger-hover, #dc2626)",
      text: "var(--klin-text-inverse, #ffffff)",
      border: "var(--klin-status-danger-hover, #dc2626)",
    },
    disabled: {
      background: "var(--klin-surface-card)",
      text: "var(--klin-text-muted)",
      border: "var(--klin-border-default)",
    },
    focus: {
      ring: "var(--klin-status-danger, #ef4444)",
    },
  },
} as const;
