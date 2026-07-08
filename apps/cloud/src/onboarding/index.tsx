import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Globe, Store, Instagram, ShoppingCart, Package, Download, Wrench, HelpCircle, TrendingUp, Check, Loader2, ArrowRight } from "lucide-react";
import { setOnboarding, useOnboarding } from "@/lib/onboarding";
import { PlatformEngine } from "@klin/platform";

// UI Helpers inside onboarding.tsx for maximum self-containment
function StepTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
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

function OptionCard({
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

const BUILDING_STEPS = [
  "Setting up your dashboard",
  "Applying your theme",
  "Wiring up payments",
  "Preparing your checklist",
];

function OnboardingLayout() {
  const navigate = useNavigate();
  const onboardingState = useOnboarding();
  const { storeName, sellingStatus, revenue, productType, channels } = onboardingState;

  useEffect(() => {
    console.log("[Platform Engine Integration] OnboardingLayout loaded using platform runtime engine:", PlatformEngine);
  }, []);

  // We manage the wizard's active view index in state:
  // 0: Name, 1: Selling, 2: Revenue, 3: Products, 4: Channels, 5: Building
  const [currentStep, setCurrentStep] = useState(0);

  // For the final step loading ticks
  const [buildTick, setBuildTick] = useState(0);

  // Total steps including Building
  const totalSteps = 5;

  // Determine back navigation logic
  const handleBack = () => {
    if (currentStep === 0) {
      navigate("/signup");
    } else if (currentStep === 3 && sellingStatus === "new") {
      // Skipped revenue step (2) if selling status is new
      setCurrentStep(1);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Determine continue navigation logic
  const handleContinue = () => {
    if (currentStep === 1 && sellingStatus === "new") {
      // Skip revenue step (2) if selling status is new
      setCurrentStep(3);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Fake store setup loading ticks
  useEffect(() => {
    if (currentStep === 5) {
      const timers: ReturnType<typeof setTimeout>[] = [];
      BUILDING_STEPS.forEach((_, i) => {
        timers.push(setTimeout(() => setBuildTick(i + 1), (i + 1) * 900));
      });
      timers.push(
        setTimeout(() => {
          navigate("/dashboard");
        }, BUILDING_STEPS.length * 900 + 700)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [currentStep, navigate]);

  // Update document title for context
  useEffect(() => {
    const titles = [
      "What is your business called?",
      "Are you already selling?",
      "What is your revenue?",
      "What do you plan to sell?",
      "Where would you like to sell?",
      "Building your store...",
    ];
    document.title = `Kiln Onboarding — ${titles[currentStep] || ""}`;
  }, [currentStep]);

  // Calculations for step indicators
  const displayStepNum = currentStep === 5 ? 5 : currentStep === 3 && sellingStatus === "new" ? 3 : currentStep + 1;
  const progressPercent = currentStep === 5 ? 100 : (currentStep / totalSteps) * 100;

  const showChrome = currentStep < 5;

  // Render child forms based on current step
  const renderFormContent = () => {
    switch (currentStep) {
      case 0: { // NAME
        const trimmed = storeName.trim();
        const valid = trimmed.length > 0 && trimmed.length <= 60;
        const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        return (
          <div>
            <StepTitle
              eyebrow="1 of 5"
              title="What's your business called?"
              subtitle="Don't worry, you can change this later."
            />
            <div className="mt-10">
              <input
                autoFocus
                value={storeName}
                onChange={(e) => setOnboarding({ storeName: e.target.value.slice(0, 60) })}
                placeholder="e.g. Larder & Co."
                className="w-full rounded-xl border border-border bg-card px-5 py-4 text-lg outline-none ring-ring/30 focus:ring-2"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{slug ? `${slug}.kiln.shop` : "Your subdomain appears here"}</span>
                <span>{trimmed.length}/60</span>
              </div>
              <button
                disabled={!valid}
                onClick={handleContinue}
                className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium transition ${
                  valid
                    ? "bg-foreground text-background hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Continue <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        );
      }

      case 1: { // SELLING STATUS
        const opts: { value: typeof sellingStatus; title: string; desc: string; icon: React.ReactNode }[] = [
          { value: "online", title: "Yes, online and/or in person", desc: "I'm already making sales somewhere else.", icon: <Store className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
          { value: "past", title: "No, but I've made sales in the past", desc: "I've done this before, just not right now.", icon: <TrendingUp className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
          { value: "new", title: "No, I'm all new to selling", desc: "This is my first time. Show me the ropes.", icon: <Sparkles className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
        ];
        return (
          <div>
            <StepTitle eyebrow="2 of 5" title="Are you already selling?" />
            <div className="mt-10 grid gap-3">
              {opts.map((o) => (
                <OptionCard
                  key={o.value}
                  selected={sellingStatus === o.value}
                  onClick={() => setOnboarding({ sellingStatus: o.value })}
                  title={o.title}
                  desc={o.desc}
                  icon={o.icon}
                />
              ))}
            </div>
            <button
              disabled={!sellingStatus}
              onClick={handleContinue}
              className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium transition ${
                sellingStatus
                  ? "bg-foreground text-background hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      }

      case 2: { // REVENUE
        const opts: { value: typeof revenue; title: string; desc: string }[] = [
          { value: "none", title: "None yet", desc: "Just getting started." },
          { value: "under10k", title: "Up to $10,000 / year", desc: "Early sales, testing the waters." },
          { value: "10k-100k", title: "$10k – $100k / year", desc: "A real business, growing." },
          { value: "100k+", title: "$100k+ / year", desc: "Established and scaling." },
        ];
        return (
          <div>
            <StepTitle
              eyebrow="3 of 5"
              title="What's your current revenue?"
              subtitle="We'll use this to recommend the right plan — no gating."
            />
            <div className="mt-10 grid gap-3">
              {opts.map((o) => (
                <OptionCard
                  key={o.value}
                  selected={revenue === o.value}
                  onClick={() => setOnboarding({ revenue: o.value })}
                  title={o.title}
                  desc={o.desc}
                />
              ))}
            </div>
            <button
              disabled={!revenue}
              onClick={handleContinue}
              className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium transition ${
                revenue
                  ? "bg-foreground text-background hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      }

      case 3: { // PRODUCTS
        const opts: { value: typeof productType; title: string; desc: string; icon: React.ReactNode }[] = [
          { value: "physical", title: "Physical products", desc: "Things I ship in a box.", icon: <Package className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
          { value: "digital", title: "Digital products", desc: "Downloads, prints, courses.", icon: <Download className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
          { value: "services", title: "Services", desc: "Time, expertise, bookings.", icon: <Wrench className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
          { value: "unsure", title: "I'm not sure yet", desc: "Still figuring it out.", icon: <HelpCircle className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
        ];
        return (
          <div>
            <StepTitle eyebrow="4 of 5" title="What do you plan to sell?" />
            <div className="mt-10 grid gap-3">
              {opts.map((o) => (
                <OptionCard
                  key={o.value}
                  selected={productType === o.value}
                  onClick={() => setOnboarding({ productType: o.value })}
                  title={o.title}
                  desc={o.desc}
                  icon={o.icon}
                />
              ))}
            </div>
            <button
              disabled={!productType}
              onClick={handleContinue}
              className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium transition ${
                productType
                  ? "bg-foreground text-background hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      }

      case 4: { // CHANNELS
        const opts = [
          { value: "online", title: "An online store", desc: "A website of my own.", icon: <Globe className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
          { value: "inperson", title: "In person", desc: "A pop-up, market, or retail spot.", icon: <Store className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
          { value: "social", title: "Social media", desc: "Instagram, TikTok, Facebook.", icon: <Instagram className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
          { value: "marketplace", title: "Online marketplaces", desc: "Amazon, Etsy, eBay.", icon: <ShoppingCart className="h-5 w-5" style={{ color: "var(--terracotta)" }} /> },
        ];
        const toggle = (v: string) => {
          const next = channels.includes(v) ? channels.filter((c) => c !== v) : [...channels, v];
          setOnboarding({ channels: next });
        };
        const canContinue = channels.length > 0;
        return (
          <div>
            <StepTitle
              eyebrow="5 of 5"
              title="Where would you like to sell?"
              subtitle="Pick as many as you want. You can add more later."
            />
            <div className="mt-10 grid gap-3">
              {opts.map((o) => (
                <OptionCard
                  key={o.value}
                  multi
                  selected={channels.includes(o.value)}
                  onClick={() => toggle(o.value)}
                  title={o.title}
                  desc={o.desc}
                  icon={o.icon}
                />
              ))}
            </div>
            <button
              disabled={!canContinue}
              onClick={handleContinue}
              className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium transition ${
                canContinue
                  ? "bg-foreground text-background hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Build my store <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {showChrome && (
        <header className="border-b border-border anim-fade-in-down">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
            <Link to="/" className="flex items-center gap-2 hover-slide-right">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ background: "var(--terracotta)" }}
              >
                <Sparkles className="h-4 w-4 text-background" />
              </span>
              <span className="font-display text-xl">Kiln</span>
            </Link>
            <div className="flex items-center gap-6">
              <div className="hidden h-1.5 w-48 overflow-hidden rounded-full bg-muted sm:block">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progressPercent}%`,
                    background: "var(--terracotta)",
                    transition: "width 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-semibold">
                Step {displayStepNum} of {totalSteps}
              </span>
            </div>
          </div>
          <div className="mx-auto max-w-5xl px-6 pt-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground hover-slide-right transition"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </div>
        </header>
      )}

      {currentStep < 5 ? (
        <main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-xl items-center justify-center px-6 py-12">
          <div
            key={currentStep}
            className="w-full bg-card border border-border/80 rounded-3xl p-8 sm:p-12 shadow-2xl anim-fade-in-up"
          >
            {renderFormContent()}
          </div>
        </main>
      ) : (
        /* Final building fullscreen loading step (step 5) */
        <div className="fixed inset-0 grid place-items-center bg-background px-6">
          <div className="w-full max-w-md text-center -translate-y-16">
            <div
              className="mx-auto grid h-14 w-14 place-items-center rounded-2xl"
              style={{ background: "linear-gradient(135deg, var(--terracotta), oklch(0.55 0.13 30))" }}
            >
              <Sparkles className="h-6 w-6 text-background animate-pulse" />
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-balance">
              Building {storeName || "your store"}…
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Give us a moment — we're opening the shutters.
            </p>
            <ul className="mt-6 grid gap-3 text-left">
              {BUILDING_STEPS.map((label, i) => {
                const done = i < buildTick;
                const active = i === buildTick;
                return (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition"
                    style={{ opacity: done || active ? 1 : 0.4 }}
                  >
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full"
                      style={done ? { background: "var(--emerald)", color: "white" } : { background: "var(--muted)" }}
                    >
                      {done ? <Check className="h-3.5 w-3.5" /> : active ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                    </span>
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default OnboardingLayout;
