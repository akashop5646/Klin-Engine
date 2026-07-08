import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

export function StepTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--terracotta)" }}>
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 font-display text-4xl leading-tight text-balance">{title}</h1>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function OptionCard({
  selected,
  onClick,
  title,
  desc,
  icon,
  multi,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
  icon?: React.ReactNode;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition " +
        (selected
          ? "border-foreground bg-foreground/[0.03] shadow-[var(--shadow-card)]"
          : "border-border bg-card hover:border-foreground/40")
      }
    >
      {icon && (
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg"
          style={{ background: "oklch(0.94 0.03 55)" }}
        >
          {icon}
        </span>
      )}
      <span className="flex-1">
        <span className="block font-medium">{title}</span>
        {desc && <span className="mt-0.5 block text-sm text-muted-foreground">{desc}</span>}
      </span>
      <span
        className={
          "grid h-6 w-6 place-items-center " +
          (multi ? "rounded-md " : "rounded-full ") +
          (selected ? "" : "border border-border")
        }
        style={selected ? { background: "var(--terracotta)", color: "white" } : undefined}
      >
        {selected && <Check className="h-4 w-4" />}
      </span>
    </button>
  );
}

export function ContinueLink({
  to,
  disabled,
  label = "Continue",
}: {
  to: string;
  disabled?: boolean;
  label?: string;
}) {
  if (disabled) {
    return (
      <button
        disabled
        className="mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-muted px-4 py-3 text-sm font-medium text-muted-foreground"
      >
        {label}
      </button>
    );
  }
  return (
    <Link
      to={to}
      className="mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background transition hover:opacity-90"
    >
      {label} <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}