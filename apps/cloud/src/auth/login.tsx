import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  Check,
  Globe,
  CreditCard,
  LineChart,
  Palette,
  Sparkles,
  Star,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { motion, AnimatePresence } from "framer-motion";

export default function Landing() {
  useEffect(() => {
    document.title = "Kiln — Start, run, and grow your business";
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <LogoStrip />
      <HowItWorks />
      <Pillars />
      <FeatureZig
        eyebrow="Storefronts"
        title="A shop that looks like you made it. Because you did."
        body="Twelve themes crafted by real designers, each one editable down to the corner radius. Drag, drop, ship — no CSS necessary."
        mock={<StorefrontMock />}
        bgClass="bg-background"
      />
      <FeatureZig
        reverse
        eyebrow="Payments"
        title="Get paid the moment someone taps buy."
        body="Accept cards, wallets, and buy-now-pay-later out of the box. No plugins, no separate processor, no waiting three days for the money to land."
        mock={<CheckoutMock />}
        bgClass="bg-card/45"
      />
      <FeatureZig
        eyebrow="Analytics"
        title="Numbers that read like a story."
        body="See what sold, what didn't, and where your next customer is coming from — in plain English, not spreadsheets."
        mock={<AnalyticsMock />}
        bgClass="bg-background"
      />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

/* ────────────────────────────────────────────── How It Works (Shopify Inspired) */

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [typedName, setTypedName] = useState("Linen apron");
  const [typedPrice, setTypedPrice] = useState("$48");
  const [themeColor, setThemeColor] = useState("oklch(0.68 0.14 45)");
  const [toggles, setToggles] = useState({ applePay: true, stripe: true, paypal: false });
  const [visitorCount, setVisitorCount] = useState(42);
  const headingRef = useInView();
  const gridRef = useInView({ rootMargin: "0px 0px -40px 0px" });

  // Auto-slide effect to cycle steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Simulating real-time data ticks on Launch step
  useEffect(() => {
    if (activeStep === 3) {
      const interval = setInterval(() => {
        setVisitorCount((v) => v + Math.floor(Math.random() * 3) + 1);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [activeStep]);

  const steps = [
    {
      id: 0,
      title: "1. Brand & Theme Customizer",
      desc: "Customize fonts, shapes, and color schemes. Select pre-curated color sets or use custom branding colors.",
      accent: "#1a1a1a",
      bgLight: "#f5f5f5",
      badge: "Styling",
    },
    {
      id: 1,
      title: "2. Load & Sync Products",
      desc: "Input names, prices, and imagery. Kiln auto-scales layouts and optimizes listings for lightning-fast loads.",
      accent: "#1a1a1a",
      bgLight: "#f0f0f0",
      badge: "Inventory",
    },
    {
      id: 2,
      title: "3. Gateway & Checkouts",
      desc: "Enable Shopify-style one-click checkouts (Apple Pay, credit cards, local payments) with straightforward toggles.",
      accent: "#1a1a1a",
      bgLight: "#f5f5f5",
      badge: "Payments",
    },
    {
      id: 3,
      title: "4. Hit Publish & Go Live",
      desc: "Connect custom domains instantly. Monitor order alerts, active cart visitors, and checkout flows live.",
      accent: "#1a1a1a",
      bgLight: "#f0f0f0",
      badge: "Live",
    },
  ];

  return (
    <section id="how-it-works" className="border-b border-border/40 bg-white py-24 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 anim-scroll-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold">
            Zero coding. Infinite customizability.
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight text-black">
            How building a store works.
          </h2>
          <p className="mt-4 text-neutral-600 text-lg">
            See how easily you can morph layouts, add merchandise, enable checkouts, and launch your shop live.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-12 lg:grid-cols-[1.1fr_1.3fr] lg:gap-16 items-center anim-scroll-blur">
          {/* Left panel: Steps */}
          <div className="space-y-4">
            {steps.map((s, idx) => {
              const isActive = activeStep === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${isActive
                    ? "bg-neutral-100 border-neutral-200 shadow-lg scale-[1.01]"
                    : "bg-transparent border-transparent hover:bg-neutral-50 hover:border-neutral-200"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: isActive ? s.bgLight : "#e5e5e5",
                        color: isActive ? s.accent : "#737373",
                      }}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <h3
                    className="mt-3 font-display text-xl transition-colors text-black"
                    style={{ color: isActive ? s.accent : "#404040" }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                    {s.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right panel: Visual interactive preview screen */}
          <div className="relative aspect-[4/3] w-full rounded-2xl border border-border/80 bg-zinc-950 p-5 shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-zinc-800" />
                <span className="h-3 w-3 rounded-full bg-zinc-800" />
                <span className="h-3 w-3 rounded-full bg-zinc-800" />
              </div>
              <div className="rounded-md bg-zinc-900 border border-zinc-800/80 px-4 py-1 text-[11px] font-mono text-zinc-500 w-1/2 text-center select-none">
                {activeStep === 3 ? "yourbrand.com" : "kiln.store/editor"}
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-500 px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-900 animate-pulse">
                {activeStep === 3 ? "Live" : "Editing"}
              </span>
            </div>

            {/* Interactive Workspace Body */}
            <div className="flex-1 flex gap-4 py-4 overflow-hidden text-zinc-300">
              {/* STYLING CUSTOMIZER: STEP 0 */}
              {activeStep === 0 && (
                <div className="flex-1 grid grid-cols-[160px_1fr] gap-4 anim-fade-in">
                  {/* Left Customizer Control */}
                  <div className="bg-zinc-900/60 rounded-xl p-3 border border-zinc-850 text-[11px] flex flex-col justify-between">
                    <div>
                      <div className="font-semibold text-zinc-400 mb-2">Palette Colors</div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { color: "oklch(0.68 0.14 45)", label: "Terracotta" },
                          { color: "oklch(0.72 0.13 55)", label: "Amber" },
                          { color: "oklch(0.32 0.06 155)", label: "Emerald" },
                          { color: "oklch(0.16 0.015 60)", label: "Ink" },
                        ].map((c) => (
                          <button
                            key={c.label}
                            onClick={() => setThemeColor(c.color)}
                            className={`h-7 rounded border transition-all ${themeColor === c.color ? "border-white scale-105" : "border-zinc-800"
                              }`}
                            style={{ background: c.color }}
                            title={c.label}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 border-t border-zinc-850 pt-3">
                      <div className="font-semibold text-zinc-400 mb-1.5">Primary Font</div>
                      <div className="space-y-1.5">
                        <button className="w-full text-left px-2 py-1 rounded bg-zinc-850 text-white font-serif">Instrument Serif</button>
                        <button className="w-full text-left px-2 py-1 rounded bg-zinc-800/40 text-zinc-500 font-sans">Inter Sans</button>
                      </div>
                    </div>
                  </div>

                  {/* Right Customizer Preview */}
                  <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex flex-col justify-between relative">
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-850">
                      <div className="text-[12px] font-serif font-bold text-white">Stoneware Co.</div>
                      <div className="flex gap-2 text-[9px] text-zinc-500">
                        <span>Shop</span>
                        <span>Info</span>
                      </div>
                    </div>
                    <div className="my-auto text-center py-4">
                      <div className="mx-auto w-12 h-12 rounded-xl mb-3 flex items-center justify-center transition-all duration-300" style={{ background: themeColor }}>
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-serif text-[18px] text-white">Elegant Ceramics</h4>
                      <p className="text-[10px] text-zinc-500 max-w-[160px] mx-auto mt-1">Baked in small batches right from our studio counter.</p>
                    </div>
                    <button className="w-full py-2 rounded-lg text-center text-xs font-semibold transition-all duration-300 text-white" style={{ background: themeColor }}>
                      View Collections
                    </button>
                  </div>
                </div>
              )}

              {/* PRODUCTS CUSTOMIZER: STEP 1 */}
              {activeStep === 1 && (
                <div className="flex-1 grid grid-cols-[180px_1fr] gap-4 anim-fade-in">
                  {/* Left Product Add Form */}
                  <div className="bg-zinc-900/60 rounded-xl p-3 border border-zinc-850 text-[11px] flex flex-col gap-3">
                    <div>
                      <label className="text-zinc-500 block mb-1">Product Title</label>
                      <input
                        type="text"
                        value={typedName}
                        onChange={(e) => setTypedName(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-white outline-none focus:border-zinc-600"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-500 block mb-1">Price</label>
                      <input
                        type="text"
                        value={typedPrice}
                        onChange={(e) => setTypedPrice(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-white outline-none focus:border-zinc-600"
                      />
                    </div>
                    <div className="mt-1">
                      <div className="text-zinc-500 block mb-1">Product Accent</div>
                      <div className="flex gap-2">
                        <span className="w-4 h-4 rounded-full" style={{ background: "oklch(0.85 0.04 85)" }} />
                        <span className="w-4 h-4 rounded-full" style={{ background: "oklch(0.88 0.05 55)" }} />
                        <span className="w-4 h-4 rounded-full" style={{ background: "oklch(0.82 0.06 45)" }} />
                      </div>
                    </div>
                  </div>

                  {/* Right Live Shop Grid */}
                  <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex flex-col">
                    <div className="text-[12px] text-zinc-400 font-medium mb-3">All Products</div>
                    <div className="grid grid-cols-2 gap-3 flex-1">
                      {/* Existing Item */}
                      <div className="bg-zinc-950 rounded-lg p-2 border border-zinc-850 flex flex-col justify-between">
                        <div className="aspect-square w-full rounded bg-amber-900/20 border border-amber-900/40 flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-amber-500" />
                        </div>
                        <div className="mt-2 flex justify-between items-center text-[10px]">
                          <span className="text-zinc-300 truncate">Linen Apron</span>
                          <span className="text-zinc-400 font-semibold">$48</span>
                        </div>
                      </div>
                      {/* Added Item */}
                      <div className="bg-zinc-950 rounded-lg p-2 border border-amber-850 flex flex-col justify-between anim-scale-in">
                        <div className="aspect-square w-full rounded bg-orange-900/30 border border-orange-800/60 flex items-center justify-center relative overflow-hidden">
                          <Sparkles className="h-6 w-6 text-orange-400 absolute top-2 right-2 animate-pulse" />
                          <ShoppingBag className="h-8 w-8 text-orange-400" />
                        </div>
                        <div className="mt-2 flex justify-between items-center text-[10px]">
                          <span className="text-white truncate font-medium">{typedName}</span>
                          <span className="text-orange-400 font-semibold">{typedPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CHECKOUTS CUSTOMIZER: STEP 2 */}
              {activeStep === 2 && (
                <div className="flex-1 grid grid-cols-[180px_1fr] gap-4 anim-fade-in">
                  {/* Left Gateway Toggle panel */}
                  <div className="bg-zinc-900/60 rounded-xl p-3 border border-zinc-850 text-[11px] flex flex-col justify-between">
                    <div>
                      <div className="font-semibold text-zinc-400 mb-3">Gateways</div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">Apple Pay</span>
                          <button
                            onClick={() => setToggles((t) => ({ ...t, applePay: !t.applePay }))}
                            className={`w-8 h-4 rounded-full p-0.5 transition-colors ${toggles.applePay ? "bg-violet-600" : "bg-zinc-700"
                              }`}
                          >
                            <div className={`h-3 w-3 rounded-full bg-white transition-transform ${toggles.applePay ? "translate-x-4" : "translate-x-0"}`} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">Credit Cards</span>
                          <button
                            onClick={() => setToggles((t) => ({ ...t, stripe: !t.stripe }))}
                            className={`w-8 h-4 rounded-full p-0.5 transition-colors ${toggles.stripe ? "bg-violet-600" : "bg-zinc-700"
                              }`}
                          >
                            <div className={`h-3 w-3 rounded-full bg-white transition-transform ${toggles.stripe ? "translate-x-4" : "translate-x-0"}`} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">PayPal</span>
                          <button
                            onClick={() => setToggles((t) => ({ ...t, paypal: !t.paypal }))}
                            className={`w-8 h-4 rounded-full p-0.5 transition-colors ${toggles.paypal ? "bg-violet-600" : "bg-zinc-700"
                              }`}
                          >
                            <div className={`h-3 w-3 rounded-full bg-white transition-transform ${toggles.paypal ? "translate-x-4" : "translate-x-0"}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-[9px] text-zinc-500 border-t border-zinc-850 pt-2 leading-snug">
                      Checkouts adapt to localized bank cards and digital wallets automatically.
                    </div>
                  </div>

                  {/* Right Checkout Panel */}
                  <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex flex-col justify-between">
                    <div className="text-[12px] font-medium text-zinc-400 border-b border-zinc-850 pb-2">Express Checkout</div>
                    <div className="space-y-2 py-4 flex-1 flex flex-col justify-center">
                      {toggles.applePay && (
                        <div className="w-full bg-white text-black py-2 rounded-lg text-center text-xs font-semibold flex items-center justify-center gap-1.5 shadow select-none hover-lift anim-scale-in">
                          <span className="font-bold"> Pay</span>
                        </div>
                      )}
                      {toggles.stripe && (
                        <div className="w-full bg-violet-600 text-white py-2 rounded-lg text-center text-xs font-semibold flex items-center justify-center gap-1.5 shadow select-none hover-lift anim-scale-in">
                          <CreditCard className="h-4.5 w-4.5" /> Pay with Credit Card
                        </div>
                      )}
                      {toggles.paypal && (
                        <div className="w-full bg-amber-400 text-zinc-900 py-2 rounded-lg text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow select-none hover-lift anim-scale-in">
                          PayPal
                        </div>
                      )}
                    </div>
                    <div className="text-[9px] text-zinc-500 text-center">Protected by secure SSL and 3D Secure.</div>
                  </div>
                </div>
              )}

              {/* LAUNCH: STEP 3 */}
              {activeStep === 3 && (
                <div className="flex-1 grid grid-cols-[150px_1fr] gap-4 anim-fade-in">
                  {/* Left Launch Action / Custom Domain */}
                  <div className="bg-zinc-900/60 rounded-xl p-3 border border-zinc-850 text-[11px] flex flex-col justify-between">
                    <div>
                      <div className="font-semibold text-zinc-400 mb-2">Domain Settings</div>
                      <div className="bg-zinc-950 p-2 rounded border border-emerald-900 text-white text-[10px] font-mono leading-relaxed truncate">
                        ✓ Connected<br />
                        <span className="text-emerald-400">yourbrand.com</span>
                      </div>
                    </div>
                    <div className="bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-900 text-[10px]">
                      <div className="font-bold text-emerald-400">Storefront Status</div>
                      <div className="text-zinc-400 mt-1">Live, indexed, and hosting on edge CDNs.</div>
                    </div>
                  </div>

                  {/* Right Live Shop Visitor Analytics Mock */}
                  <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex flex-col justify-between">
                    <div>
                      <span className="text-emerald-500 font-bold text-[10px] uppercase tracking-wider bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">Live Analytics</span>
                      <h4 className="text-[12px] text-zinc-400 mt-3">Active Visitors</h4>
                      <div className="font-display text-4xl text-white mt-1 animate-pulse">{visitorCount}</div>
                    </div>
                    <div className="border-t border-zinc-850 pt-2">
                      <div className="flex justify-between items-center text-[10px] text-zinc-500">
                        <span>Cart checkout rate</span>
                        <span className="text-emerald-400 font-semibold">4.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Steps dots */}
            <div className="flex justify-center gap-1.5 pt-3 border-t border-zinc-800">
              {steps.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeStep === s.id ? "bg-white w-4" : "bg-zinc-800 w-1.5 hover:bg-zinc-700"
                    }`}
                  aria-label={`Go to step ${s.id + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── Header */

function SiteHeader() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-6">
      <div className="flex h-16 items-center justify-between rounded-full border border-border/80 bg-background/75 px-8 shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all duration-300">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Logo />
          <span className="font-display text-xl tracking-tight">Kiln</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--terracotta)] hover:after:w-full after:transition-all after:duration-300">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--terracotta)] hover:after:w-full after:transition-all after:duration-300">How it works</a>
          <a href="#pricing" className="hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--terracotta)] hover:after:w-full after:transition-all after:duration-300">Pricing</a>
          <a href="#stories" className="hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--terracotta)] hover:after:w-full after:transition-all after:duration-300">Stories</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/signup?mode=login"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground md:block transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/signup?src=header"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95 hover-scale"
          >
            Start free trial
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span
      className="grid h-8 w-8 place-items-center rounded-lg"
      style={{
        background: "linear-gradient(135deg, var(--terracotta), oklch(0.55 0.13 30))",
      }}
    >
      <Sparkles className="h-4 w-4 text-background" />
    </span>
  );
}

/* ────────────────────────────────────────────── Hero */

function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24 text-center border-b border-border/40 bg-zinc-950">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover select-none pointer-events-none opacity-20"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[var(--terracotta)] opacity-[0.06] blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-[450px] w-[450px] rounded-full bg-emerald-500 opacity-[0.05] blur-[130px] pointer-events-none" />

      {/* Dark Overlay Mask */}
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />

      {/* Centered Content Stack */}
      <div className="relative z-20 mx-auto max-w-4xl flex flex-col items-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/95 shadow-lg backdrop-blur-md cursor-default select-none"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--terracotta)" }} />
          New — one-click TikTok Shop sync
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.4 }}
          className="font-display text-balance text-5xl leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl text-white"
        >
          Start, run,{" "}
          <em className="not-italic text-[var(--terracotta)]">
            and grow
          </em>{" "}
          your business.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.6 }}
          className="mt-6 max-w-2xl text-balance text-lg md:text-xl text-white/85 font-medium leading-relaxed"
        >
          From your very first sale to your millionth, Kiln is the shop counter, the register,
          and the marketing team — all in one place. No code, no guesswork.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <motion.div
            whileHover={{ scale: 1.04, rotate: -0.5 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/signup?src=hero"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black hover:bg-white/95 transition-all hover:shadow-[0_4px_25px_rgba(255,255,255,0.2)]"
            >
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.04, rotate: 0.5 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-8 py-4 text-base font-medium text-white hover:bg-white/20 transition-all"
          >
            Watch demo
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-5 text-xs text-white/60 font-medium"
        >
          3-day free trial · then $1/month for 3 months · no credit card required
        </motion.p>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── Logo strip */

function LogoStrip() {
  const brands = ["FIELDNOTES", "Larder & Co.", "Marlow", "Ferm", "OKUR", "Hazel Bay", "Sundry"];
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];
  return (
    <section className="border-y border-border/80 bg-card/45 py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground anim-fade-in mb-6">
          Two million businesses have opened up shop with Kiln
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex gap-16 font-display text-2xl text-muted-foreground/70 select-none">
            {marqueeBrands.map((b, i) => (
              <span key={`${b}-${i}`} className="whitespace-nowrap">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── Pillars */

function Pillars() {
  const ref = useInView();
  const items = [
    {
      icon: Globe,
      title: "Sell everywhere",
      body: "Your website, Instagram, TikTok, Amazon, and the market on Sunday — one inventory, one dashboard.",
      gradient: "linear-gradient(135deg, oklch(0.68 0.14 45), oklch(0.55 0.13 30))",
      num: "01",
    },
    {
      icon: CreditCard,
      title: "Built-in payments",
      body: "Cards, wallets, and BNPL work on day one. No third-party processor to wire up.",
      gradient: "linear-gradient(135deg, oklch(0.32 0.06 155), oklch(0.28 0.05 160))",
      num: "02",
    },
    {
      icon: LineChart,
      title: "Grow with data",
      body: "Reports written like sentences. Marketing tools that don't need a certification to use.",
      gradient: "linear-gradient(135deg, oklch(0.16 0.015 60), oklch(0.25 0.02 55))",
      num: "03",
    },
    {
      icon: Palette,
      title: "Themes & customization",
      body: "Twelve editorial themes. Change fonts, colors, and layout without ever seeing HTML.",
      gradient: "linear-gradient(135deg, oklch(0.72 0.13 55), oklch(0.60 0.12 40))",
      num: "04",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="features" className="border-b border-border/80 bg-card/45 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl anim-scroll-blur" ref={ref}>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--terracotta)" }}>
            Everything, from day one
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            A whole store in a single tab.
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground text-lg">
            Every tool you need — payments, analytics, themes, and multi-channel selling — built in from the start.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((it) => (
            <PillarCard key={it.title} item={it} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PillarCard({ item }: { item: { icon: typeof Globe; title: string; body: string; gradient: string; num: string } }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02, boxShadow: "0px 10px 30px rgba(0,0,0,0.05)" }}
      whileTap={{ scale: 0.98 }}
      className="group relative rounded-2xl border border-border bg-card p-7 transition-all duration-300 overflow-hidden"
    >
      {/* Number watermark */}
      <span className="absolute top-4 right-5 font-display text-5xl font-bold text-muted-foreground/[0.06] select-none">{item.num}</span>
      {/* Icon */}
      <div
        className="grid h-12 w-12 place-items-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
        style={{ background: item.gradient }}
      >
        <item.icon className="h-5.5 w-5.5 text-white" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" style={{ background: item.gradient }} />
    </motion.div>
  );
}

/* ────────────────────────────────────────────── Feature zig-zag */

function FeatureZig({
  eyebrow,
  title,
  body,
  mock,
  reverse,
  bgClass = "bg-background",
}: {
  eyebrow: string;
  title: string;
  body: string;
  mock: React.ReactNode;
  reverse?: boolean;
  bgClass?: string;
}) {
  const textRef = useInView({ rootMargin: "0px 0px -80px 0px" });
  const mockRef = useInView({ rootMargin: "0px 0px -80px 0px" });

  return (
    <section className={`border-b border-border/40 py-24 ${bgClass}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20">
        <div
          ref={textRef}
          className={reverse ? "lg:order-2 anim-scroll-blur" : "anim-scroll-blur"}
        >
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--terracotta)" }}>
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">{body}</p>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground underline decoration-[var(--terracotta)] decoration-2 underline-offset-4 hover-slide-right"
          >
            Learn more <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div
          ref={mockRef}
          className={reverse ? "lg:order-1 anim-scroll-slit" : "anim-scroll-slit"}
        >
          {mock}
        </div>
      </div>
    </section>
  );
}

function StorefrontMock() {
  const sites = [
    { brand: "Larder & Co.", nav: ["Shop", "Journal", "About"], accent: "var(--terracotta)", products: [
      { name: "Linen apron", price: "$48", tone: "oklch(0.92 0.03 55)" },
      { name: "Cedar cutting board", price: "$76", tone: "oklch(0.88 0.04 45)" },
      { name: "Stoneware mug", price: "$28", tone: "oklch(0.90 0.03 75)" },
      { name: "Copper whisk", price: "$34", tone: "oklch(0.85 0.05 50)" },
    ]},
    { brand: "Studio Nord", nav: ["Collection", "Lookbook", "Contact"], accent: "var(--ink)", products: [
      { name: "Wool throw", price: "$120", tone: "oklch(0.90 0.02 65)" },
      { name: "Desk lamp", price: "$95", tone: "oklch(0.86 0.03 70)" },
      { name: "Notebook set", price: "$32", tone: "oklch(0.93 0.02 80)" },
      { name: "Pen holder", price: "$45", tone: "oklch(0.88 0.03 60)" },
    ]},
    { brand: "Flora Botanicals", nav: ["Plants", "Pots", "Care"], accent: "var(--emerald)", products: [
      { name: "Monstera", price: "$65", tone: "oklch(0.88 0.04 80)" },
      { name: "Terra cotta pot", price: "$28", tone: "oklch(0.85 0.05 50)" },
      { name: "Fern basket", price: "$42", tone: "oklch(0.90 0.03 75)" },
      { name: "Plant food", price: "$15", tone: "oklch(0.92 0.03 65)" },
    ]},
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % sites.length), 4000);
    return () => clearInterval(t);
  }, [sites.length]);
  const site = sites[active];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="mx-auto rounded-md bg-background border border-border px-6 py-1 text-[10px] font-mono text-muted-foreground text-center w-2/3 truncate">
          {site.brand.toLowerCase().replace(/[^a-z]/g, "")}.com
        </div>
      </div>
      {/* Site content — slides */}
      <div className="p-5 transition-all duration-700 ease-out" key={active} style={{ animation: "fadeSlideIn 0.7s cubic-bezier(0.16,1,0.3,1)" }}>
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="font-display text-lg" style={{ color: site.accent }}>{site.brand}</span>
          <div className="flex gap-4 text-xs text-muted-foreground">
            {site.nav.map((n) => <span key={n}>{n}</span>)}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {site.products.map((p, i) => (
            <div key={p.name} className="rounded-xl bg-muted/40 p-3 hover-lift transition-all" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="aspect-square rounded-lg transition-all duration-500" style={{ background: p.tone }} />
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-medium">{p.name}</span>
                <span className="text-muted-foreground">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Slide indicator dots */}
      <div className="flex justify-center gap-1.5 pb-4">
        {sites.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-5 bg-foreground" : "w-1.5 bg-muted-foreground/30"}`} />
        ))}
      </div>
    </div>
  );
}

function CheckoutMock() {
  const [paid, setPaid] = useState(false);
  const [showCoins, setShowCoins] = useState(false);

  const handlePay = () => {
    if (paid) return;
    setPaid(true);
    setShowCoins(true);
    setTimeout(() => setShowCoins(false), 3000);
    setTimeout(() => setPaid(false), 5000);
  };

  return (
    <div className="relative rounded-2xl border border-border bg-card p-6 shadow-2xl overflow-hidden">
      {/* Money received animation overlay */}
      {showCoins && (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          {/* Floating dollar signs */}
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute text-2xl select-none"
              style={{
                left: `${12 + i * 12}%`,
                bottom: "-20px",
                animation: `coinFloat 2s ease-out ${i * 0.15}s forwards`,
                opacity: 0,
              }}
            >
              💵
            </span>
          ))}
        </div>
      )}
      
      <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Checkout</div>
      <div className="mt-4 space-y-3">
        <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm">
          mira@studio.co
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-mono">
            •••• •••• •••• 4242
          </div>
          <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-mono">
            12/28
          </div>
        </div>
        <button
          onClick={handlePay}
          className={`relative w-full rounded-lg px-4 py-3 text-sm font-medium transition-all duration-500 ${
            paid
              ? "text-white scale-[1.02] shadow-lg"
              : "text-background hover-scale"
          }`}
          style={{ background: paid ? "var(--emerald)" : "var(--emerald)" }}
        >
          <span className={`inline-flex items-center gap-2 transition-all duration-300 ${paid ? "opacity-100" : ""}`}>
            {paid ? (
              <>
                <Check className="h-4 w-4" /> Payment received — $84.00
              </>
            ) : (
              "Pay $84.00"
            )}
          </span>
        </button>
        {/* Success receipt slide-in */}
        <div className={`overflow-hidden transition-all duration-500 ${paid ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="rounded-lg border px-4 py-2.5 text-xs flex items-center gap-2" style={{ borderColor: "oklch(0.32 0.06 155 / 30%)", background: "oklch(0.32 0.06 155 / 10%)", color: "oklch(0.50 0.08 155)" }}>
            <span className="h-5 w-5 rounded-full grid place-items-center text-white" style={{ background: "var(--emerald)" }}><Check className="h-3 w-3" /></span>
            Funds deposited to your Kiln balance instantly
          </div>
        </div>
        <div className="flex justify-center gap-2 pt-1 text-xs text-muted-foreground">
          <span>Apple Pay</span>·<span>Google Pay</span>·<span>Klarna</span>·<span>Shop Pay</span>
        </div>
      </div>
    </div>
  );
}

function AnalyticsMock() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Last 30 days
        </span>
        <span className="font-display text-3xl">$28,412</span>
      </div>
      <svg viewBox="0 0 300 100" className="mt-4 w-full">
        <path
          d="M0 80 C 40 60, 60 78, 90 55 S 150 40, 180 45 S 240 15, 300 20"
          fill="none"
          stroke="var(--terracotta)"
          strokeWidth="2.5"
        />
        <path
          d="M0 80 C 40 60, 60 78, 90 55 S 150 40, 180 45 S 240 15, 300 20 L 300 100 L 0 100 Z"
          fill="oklch(0.9 0.06 55 / 0.4)"
        />
      </svg>
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        {[
          ["Sessions", "12,480"],
          ["Conv. rate", "3.8%"],
          ["Avg. order", "$62"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-muted/50 p-3 hover-lift">
            <div className="text-xs text-muted-foreground">{k}</div>
            <div className="font-display text-lg">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────── Testimonials */

function Testimonials() {
  const items = [
    {
      quote: "I opened Larder & Co. on a Sunday afternoon. By Tuesday I'd shipped my first ten orders.",
      name: "Mira Okafor",
      biz: "Larder & Co.",
      metric: "3× revenue in 6 months",
      tone: "oklch(0.88 0.06 55)",
    },
    {
      quote: "The dashboard reads like a newspaper. I finally know what's actually working.",
      name: "Jules Tanaka",
      biz: "Fieldnotes",
      metric: "42% repeat customers",
      tone: "oklch(0.90 0.03 75)",
    },
    {
      quote: "We moved off three different platforms into Kiln. Nothing broke. Sales went up.",
      name: "Sam Reyes",
      biz: "Hazel Bay",
      metric: "$1.2M in first year",
      tone: "oklch(0.86 0.08 45)",
    },
  ];
  return (
    <TestimonialSection items={items} />
  );
}

function TestimonialSection({ items }: { items: Array<{ quote: string; name: string; biz: string; metric: string; tone: string }> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const headingRef = useInView();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  const prev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  const next = () => setActiveIndex((prev) => (prev + 1) % items.length);

  return (
    <section id="stories" className="border-b border-border/80 bg-card/45 py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="flex items-end justify-between anim-scroll-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--terracotta)" }}>
              Loved by creators worldwide
            </p>
            <h2 className="mt-3 max-w-xl font-display text-4xl leading-tight sm:text-5xl text-balance">
              The shops of tomorrow, open today.
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:bg-muted transition hover-scale"
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current fill-none stroke-2"><path d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={next}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:bg-muted transition hover-scale"
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current fill-none stroke-2"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Carousel Slide Area */}
        <div className="mt-14 relative h-[310px] sm:h-[260px] md:h-[220px] w-full">
          {items.map((t, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={t.name}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${isActive
                  ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                  : "opacity-0 translate-x-12 scale-95 pointer-events-none"
                  }`}
              >
                <figure className="mx-auto max-w-4xl flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-8 md:p-10 shadow-[var(--shadow-card)] min-h-[220px] relative overflow-hidden">
                  <blockquote className="font-display text-2xl md:text-3xl leading-snug text-balance">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <div
                      className="h-11 w-11 rounded-full border border-white/10"
                      style={{ background: t.tone }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.biz}</div>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium bg-emerald-950/30 text-emerald-400 border border-emerald-900"
                    >
                      {t.metric}
                    </span>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-foreground w-4" : "bg-muted w-1.5 hover:bg-zinc-750"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── Pricing */

function Pricing() {
  const tiers = [
    {
      name: "Basic",
      price: "$29",
      tagline: "For your first sales.",
      features: ["Online store", "Unlimited products", "24/7 support", "2 staff accounts"],
      cta: "pricing_basic",
      highlight: false,
    },
    {
      name: "Grow",
      price: "$79",
      tagline: "For scaling your best week.",
      features: ["Everything in Basic", "5 staff accounts", "Professional reports", "Lower card fees"],
      cta: "pricing_grow",
      highlight: true,
    },
    {
      name: "Advanced",
      price: "$299",
      tagline: "For the shop that runs itself.",
      features: ["Everything in Grow", "15 staff accounts", "Custom reports", "Lowest card fees"],
      cta: "pricing_advanced",
      highlight: false,
    },
  ];
  return (
    <PricingSection tiers={tiers} />
  );
}

function PricingSection({ tiers }: { tiers: Array<{ name: string; price: string; tagline: string; features: string[]; cta: string; highlight: boolean }> }) {
  const headingRef = useInView();
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <div ref={headingRef} className="mx-auto max-w-2xl text-center anim-scroll-blur">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--terracotta)" }}>
          Pricing
        </p>
        <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          One flat price. Every feature.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Start free for three days. Then pick a plan that fits — change any time.
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {tiers.map((t) => (
          <PricingCard key={t.name} tier={t} />
        ))}
      </motion.div>
    </section>
  );
}

function PricingCard({ tier }: { tier: { name: string; price: string; tagline: string; features: string[]; cta: string; highlight: boolean } }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02, boxShadow: "0px 10px 30px rgba(0,0,0,0.05)" }}
      whileTap={{ scale: 0.98 }}
      className={
        "flex flex-col rounded-2xl border p-8 transition-all duration-300 " +
        (tier.highlight
          ? "border-transparent text-background"
          : "border-border bg-card")
      }
      style={{
        ...(tier.highlight ? { background: "var(--ink)" } : undefined),
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl">{tier.name}</h3>
        {tier.highlight && (
          <span
            className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest"
            style={{ background: "var(--terracotta)", color: "white" }}
          >
            Most popular
          </span>
        )}
      </div>
      <p className={"mt-2 text-sm " + (tier.highlight ? "opacity-70" : "text-muted-foreground")}>
        {tier.tagline}
      </p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-5xl">{tier.price}</span>
        <span className={tier.highlight ? "opacity-70" : "text-muted-foreground"}>/mo</span>
      </div>
      <ul className="mt-6 space-y-3 text-sm">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ color: tier.highlight ? "var(--terracotta)" : "var(--emerald)" }}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-auto"
      >
        <Link
          to={`/signup?src=${tier.cta}`}
          className={
            "w-full mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium transition " +
            (tier.highlight
              ? "bg-background text-foreground hover:opacity-90"
              : "bg-foreground text-background hover:opacity-90")
          }
        >
          Start free trial
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────── Final CTA */

function FinalCTA() {
  const ref = useInView();
  return (
    <section className="bg-card/45 border-b border-border/80 py-24 px-6">
      <div
        ref={ref}
        className="anim-fade-in-up"
      >
        <div
          className="mx-auto max-w-7xl overflow-hidden rounded-3xl px-8 py-20 text-center anim-gradient"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.13 40), oklch(0.55 0.12 30), oklch(0.68 0.14 45), oklch(0.72 0.13 40))",
            backgroundSize: "200% 200%",
          }}
        >
          <Zap className="mx-auto h-8 w-8 text-white/90 anim-pulse-subtle" />
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight text-white sm:text-6xl text-balance">
            Your shop, open by dinner.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/85">
            Three minutes to sign up. Three days free. No credit card, no catch.
          </p>
          <Link
            to="/signup?src=final"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-medium text-foreground transition hover:opacity-95 hover-scale"
          >
            Start free trial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── Footer */

function SiteFooter() {
  const cols = [
    {
      h: "Product",
      links: ["Storefronts", "Payments", "Analytics", "Marketing", "POS"],
    },
    {
      h: "Solutions",
      links: ["Starting up", "Selling online", "Selling in person", "Wholesale"],
    },
    {
      h: "Resources",
      links: ["Help center", "Guides", "API docs", "Community", "Status"],
    },
    {
      h: "Company",
      links: ["About", "Careers", "Press", "Partners", "Contact"],
    },
  ];
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-xl">Kiln</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The commerce platform for makers, side-hustles, and the shops of tomorrow.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-sm font-medium">{c.h}</div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground transition-colors hover-slide-right">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© 2026 Kiln, Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
            <a href="#" className="hover:text-foreground transition-colors">English (US)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
