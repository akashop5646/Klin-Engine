import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { setOnboarding } from "@/lib/onboarding";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "I opened Larder & Co. on a Sunday afternoon. By Tuesday I'd shipped my first ten orders.",
    founder: "Mira Okafor",
    company: "Larder & Co.",
    domain: "larderandco.kiln.store",
    image: "/larder_co.png",
  },
  {
    id: 2,
    quote: "Kiln's checkout converted 40% better than our previous custom setup. The transition was seamless.",
    founder: "Lukas Berg",
    company: "Studio Nord",
    domain: "studionord.kiln.store",
    image: "/studio_nord.png",
  },
  {
    id: 3,
    quote: "Managing inventory across three locations used to take hours. Now it's fully automated on Kiln.",
    founder: "Elena Rostova",
    company: "Flora Botanicals",
    domain: "florabotanicals.kiln.store",
    image: "/flora_botanicals.png",
  },
];

type AuthMode = "signup" | "login" | "otp_verify" | "forgot_password" | "reset_password";

function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "login" ? "login" : "signup";
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCredentialResponse = async (response: any) => {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch("/api/auth/google/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Google verification failed");
      }

      localStorage.setItem("kiln.auth.token", data.token);
      localStorage.setItem("kiln.auth.user", JSON.stringify(data.user));

      setOnboarding(data.user.onboarding || {});

      if (data.user.onboarding?.storeName) {
        navigate("/dashboard/analytics");
      } else {
        navigate("/onboarding");
      }
    } catch (e: any) {
      console.error(e);
      setErr(e.message || "Failed to log in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleMockSignIn = () => {
    console.log("Google API not loaded. Falling back to mock authentication.");
    handleCredentialResponse({ credential: "mock_developer" });
  };

  useEffect(() => {
    const initGoogleSignIn = () => {
      const g = (window as any).google;
      if (g?.accounts?.id) {
        g.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "your_google_client_id.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });

        g.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          {
            theme: "outline",
            size: "large",
            width: "380",
            shape: "pill",
          }
        );
      } else {
        setTimeout(initGoogleSignIn, 100);
      }
    };

    initGoogleSignIn();
  }, []);

  useEffect(() => {
    document.title = 
      mode === "signup" ? "Create your account · Kiln" : 
      mode === "login" ? "Log in to your account · Kiln" :
      mode === "otp_verify" ? "Verify your email · Kiln" :
      "Reset your password · Kiln";
  }, [mode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Enter a valid email address.");
    if (password.length < 8) return setErr("Use at least 8 characters.");
    
    setLoading(true);
    setErr(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to sign up.");
      }

      setSuccessMsg("Verification code dispatched to your email!");
      setMode("otp_verify");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return setErr("Please enter the 6-digit code.");

    setLoading(true);
    setErr(null);

    try {
      const res = await fetch("/api/auth/signup/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Verification failed.");
      }

      localStorage.setItem("kiln.auth.token", data.token);
      localStorage.setItem("kiln.auth.user", JSON.stringify(data.user));
      setOnboarding(data.user.onboarding || {});

      navigate("/onboarding");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Enter a valid email address.");
    if (!password) return setErr("Please enter your password.");

    setLoading(true);
    setErr(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.code === "UNVERIFIED") {
          // Send a new OTP automatically for verification
          await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          setSuccessMsg("Account unverified. New OTP sent!");
          setMode("otp_verify");
          return;
        }
        throw new Error(data.error || "Login failed.");
      }

      localStorage.setItem("kiln.auth.token", data.token);
      localStorage.setItem("kiln.auth.user", JSON.stringify(data.user));
      setOnboarding(data.user.onboarding || {});

      if (data.user.onboarding?.storeName) {
        navigate("/dashboard/analytics");
      } else {
        navigate("/onboarding");
      }
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Enter a valid email address.");

    setLoading(true);
    setErr(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to trigger reset flow.");
      }

      setSuccessMsg("Password reset code sent to your email!");
      setMode("reset_password");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return setErr("Enter the 6-digit verification code.");
    if (newPassword.length < 8) return setErr("New password must be at least 8 characters.");

    setLoading(true);
    setErr(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setSuccessMsg("Password updated successfully! Please log in.");
      setMode("login");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const requestNewSignupOtp = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccessMsg("A fresh code has been sent!");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-0 lg:p-6">
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 lg:rounded-3xl border-0 lg:border border-border/80 bg-card overflow-hidden shadow-2xl min-h-screen lg:min-h-[85vh]">
        <aside
          className="relative hidden flex-col justify-between p-10 text-background lg:flex anim-fade-in overflow-hidden grain lg:m-3 lg:rounded-2xl"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.32 0.06 155), oklch(0.22 0.04 155))",
          }}
        >
          {/* Logo */}
          <Link to="/" className="relative z-10 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-background/10">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-xl">Kiln</span>
          </Link>

          {/* Browser Mockup Centerpiece */}
          <div className="relative flex-1 flex items-center justify-center py-8">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-md">
              {testimonials.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex flex-col ${
                    idx === currentIndex ? "browser-mockup-active" : "browser-mockup-inactive"
                  }`}
                >
                  {/* Browser Header Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10 select-none">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    </div>
                    <div className="mx-auto flex items-center justify-center rounded-md bg-white/5 px-4 py-1 text-[11px] font-mono text-white/50 w-2/3 border border-white/5 truncate">
                      {item.domain}
                    </div>
                  </div>

                  {/* Browser Viewport */}
                  <div className="relative flex-1 overflow-hidden bg-zinc-950">
                    <img
                      src={item.image}
                      alt={item.company}
                      className="absolute top-0 left-0 w-full object-cover origin-top animate-storefront-scroll"
                      style={{
                        height: "140%",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote Slider */}
          <div className="relative h-40 flex flex-col justify-end">
            {testimonials.map((item, idx) => (
              <div
                key={item.id}
                className={`absolute bottom-0 left-0 right-0 ${
                  idx === currentIndex ? "carousel-slide-active" : "carousel-slide-inactive"
                }`}
              >
                <blockquote className="font-display text-2.5xl md:text-3xl leading-snug text-balance">
                  "{item.quote}"
                </blockquote>
                <div className="mt-4 flex items-center gap-3 text-sm opacity-80">
                  <span className="font-semibold">{item.founder}</span>
                  <span className="opacity-50">—</span>
                  <span className="italic">{item.company}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 mt-8 flex items-center justify-between text-xs opacity-60">
            <span>© 2026 Kiln, Inc.</span>
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "bg-white w-3" : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </aside>

        <main className="flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-background">
          <div className="w-full max-w-sm">
            <Link to="/" className="flex items-center gap-2 lg:hidden anim-fade-in-down mb-6">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ background: "var(--terracotta)" }}
              >
                <Sparkles className="h-4 w-4 text-background" />
              </span>
              <span className="font-display text-xl text-foreground">Kiln</span>
            </Link>

            {/* Success / Error notification alerts */}
            <AnimatePresence mode="wait">
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-600 flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {err && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3.5 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
                  <span>{err}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* --- SIGN UP MODE --- */}
            {mode === "signup" && (
              <div className="anim-fade-in">
                <h1 className="font-display text-4xl leading-tight text-foreground">Create your account</h1>
                <p className="mt-2 text-sm text-muted-foreground">Free for three days. No credit card required.</p>

                {/* Google Sign In Container */}
                <div className="mt-8 grid gap-2">
                  <div className="relative overflow-hidden w-full group">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleMockSignIn}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted transition-all active:scale-98 text-foreground"
                    >
                      <GoogleIcon /> Continue with Google
                    </button>
                    <div
                      id="google-signin-btn"
                      className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto [&>div]:w-full [&>div]:h-full [&_iframe]:cursor-pointer"
                    />
                  </div>
                </div>

                <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
                </div>

                <form onSubmit={handleSignupSubmit} className="grid gap-4">
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Full Name</span>
                    <input
                      type="text"
                      required
                      disabled={loading}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/30 focus:ring-2 transition-shadow text-foreground"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Email</span>
                    <input
                      type="email"
                      required
                      disabled={loading}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErr(null);
                      }}
                      placeholder="you@shop.com"
                      className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/30 focus:ring-2 transition-shadow text-foreground"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Password</span>
                    <input
                      type="password"
                      required
                      disabled={loading}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErr(null);
                      }}
                      placeholder="At least 8 characters"
                      className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/30 focus:ring-2 transition-shadow text-foreground"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background hover:opacity-90 active:scale-95 transition-all w-full"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin text-background" /> : "Create account"}
                    {!loading && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </form>

                <p className="mt-6 text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button onClick={() => { setMode("login"); setErr(null); setSuccessMsg(null); }} className="font-semibold text-foreground underline hover:opacity-80">
                    Log in
                  </button>
                </p>
              </div>
            )}

            {/* --- LOG IN MODE --- */}
            {mode === "login" && (
              <div className="anim-fade-in">
                <h1 className="font-display text-4xl leading-tight text-foreground">Log in to Kiln</h1>
                <p className="mt-2 text-sm text-muted-foreground">Access your store dashboard instantly.</p>

                {/* Google Sign In Container */}
                <div className="mt-8 grid gap-2">
                  <div className="relative overflow-hidden w-full group">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleMockSignIn}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted transition-all active:scale-98 text-foreground"
                    >
                      <GoogleIcon /> Continue with Google
                    </button>
                    <div
                      id="google-signin-btn"
                      className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto [&>div]:w-full [&>div]:h-full [&_iframe]:cursor-pointer"
                    />
                  </div>
                </div>

                <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
                </div>

                <form onSubmit={handleLoginSubmit} className="grid gap-4">
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Email</span>
                    <input
                      type="email"
                      required
                      disabled={loading}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErr(null);
                      }}
                      placeholder="you@shop.com"
                      className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/30 focus:ring-2 transition-shadow text-foreground"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-muted-foreground">Password</span>
                      <button
                        type="button"
                        onClick={() => { setMode("forgot_password"); setErr(null); setSuccessMsg(null); }}
                        className="text-xs text-muted-foreground underline hover:text-foreground"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <input
                      type="password"
                      required
                      disabled={loading}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErr(null);
                      }}
                      placeholder="Password"
                      className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/30 focus:ring-2 transition-shadow text-foreground"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background hover:opacity-90 active:scale-95 transition-all w-full"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin text-background" /> : "Log in"}
                    {!loading && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </form>

                <p className="mt-6 text-sm text-muted-foreground">
                  New to Kiln?{" "}
                  <button onClick={() => { setMode("signup"); setErr(null); setSuccessMsg(null); }} className="font-semibold text-foreground underline hover:opacity-80">
                    Create account
                  </button>
                </p>
              </div>
            )}

            {/* --- OTP VERIFICATION MODE --- */}
            {mode === "otp_verify" && (
              <div className="anim-fade-in">
                <h1 className="font-display text-4xl leading-tight text-foreground">Verify your email</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter the 6-digit confirmation code we sent to <strong className="text-foreground">{email}</strong>.
                </p>

                <form onSubmit={handleVerifyOtpSubmit} className="grid gap-4 mt-8">
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">6-Digit Code</span>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      disabled={loading}
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, ""));
                        setErr(null);
                      }}
                      placeholder="123456"
                      className="rounded-lg border border-border bg-card px-4 py-3 text-center text-xl font-mono tracking-[0.4em] outline-none ring-ring/30 focus:ring-2 transition-shadow text-foreground"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background hover:opacity-90 active:scale-95 transition-all w-full"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin text-background" /> : "Verify Code"}
                    {!loading && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </form>

                <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
                  <span>
                    Didn't receive the email?{" "}
                    <button
                      type="button"
                      disabled={loading}
                      onClick={requestNewSignupOtp}
                      className="font-semibold text-foreground underline hover:opacity-80 disabled:opacity-50"
                    >
                      Resend Code
                    </button>
                  </span>
                  <button
                    type="button"
                    onClick={() => { setMode("signup"); setErr(null); setSuccessMsg(null); }}
                    className="text-xs text-muted-foreground underline text-left hover:text-foreground"
                  >
                    Change email address
                  </button>
                </div>
              </div>
            )}

            {/* --- FORGOT PASSWORD MODE --- */}
            {mode === "forgot_password" && (
              <div className="anim-fade-in">
                <h1 className="font-display text-4xl leading-tight text-foreground">Reset password</h1>
                <p className="mt-2 text-sm text-muted-foreground">Enter your email and we'll dispatch a 6-digit reset code.</p>

                <form onSubmit={handleForgotPasswordSubmit} className="grid gap-4 mt-8">
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Email Address</span>
                    <input
                      type="email"
                      required
                      disabled={loading}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErr(null);
                      }}
                      placeholder="you@shop.com"
                      className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/30 focus:ring-2 transition-shadow text-foreground"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background hover:opacity-90 active:scale-95 transition-all w-full"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin text-background" /> : "Send Reset Code"}
                    {!loading && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </form>

                <p className="mt-6 text-sm text-muted-foreground">
                  Remember your credentials?{" "}
                  <button onClick={() => { setMode("login"); setErr(null); setSuccessMsg(null); }} className="font-semibold text-foreground underline hover:opacity-80">
                    Log in
                  </button>
                </p>
              </div>
            )}

            {/* --- RESET PASSWORD MODE --- */}
            {mode === "reset_password" && (
              <div className="anim-fade-in">
                <h1 className="font-display text-4xl leading-tight text-foreground">Choose new password</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter the 6-digit code sent to <strong className="text-foreground">{email}</strong> and pick a new password.
                </p>

                <form onSubmit={handleResetPasswordSubmit} className="grid gap-4 mt-8">
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Reset Code</span>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      disabled={loading}
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, ""));
                        setErr(null);
                      }}
                      placeholder="123456"
                      className="rounded-lg border border-border bg-card px-4 py-3 text-center text-xl font-mono tracking-[0.4em] outline-none ring-ring/30 focus:ring-2 transition-shadow text-foreground"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">New Password</span>
                    <input
                      type="password"
                      required
                      disabled={loading}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setErr(null);
                      }}
                      placeholder="At least 8 characters"
                      className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/30 focus:ring-2 transition-shadow text-foreground"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background hover:opacity-90 active:scale-95 transition-all w-full"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin text-background" /> : "Reset Password"}
                    {!loading && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </form>

                <p className="mt-6 text-sm text-muted-foreground">
                  Cancel and go back to{" "}
                  <button onClick={() => { setMode("login"); setErr(null); setSuccessMsg(null); }} className="font-semibold text-foreground underline hover:opacity-80">
                    Log In
                  </button>
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.24 1.4-1.66 4.1-5.4 4.1-3.25 0-5.9-2.7-5.9-6s2.65-6 5.9-6c1.85 0 3.09.79 3.8 1.47l2.6-2.5C16.5 3.7 14.5 2.8 12 2.8 6.87 2.8 2.75 6.9 2.75 12S6.87 21.2 12 21.2c6.05 0 8.94-4.24 8.94-8.5 0-.57-.06-1-.14-1.5H12z"
      />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M16.7 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.2-2.9.9-3.6.9-.8 0-1.9-.9-3.1-.8-1.6 0-3 .9-3.8 2.4-1.6 2.9-.4 7.1 1.2 9.5.8 1.2 1.7 2.4 2.9 2.4 1.2 0 1.6-.8 3-.8s1.8.8 3 .7c1.3 0 2.1-1.2 2.8-2.3.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.9zM14.4 5.6c.6-.8 1.1-2 .9-3.1-1 0-2.2.6-2.9 1.4-.6.7-1.2 1.9-1 3 1.1.1 2.3-.5 3-1.3z" />
    </svg>
  );
}

export default SignupPage;
