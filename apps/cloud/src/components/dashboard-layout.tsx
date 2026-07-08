import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Megaphone,
  Tag,
  FileText,
  Globe,
  Settings,
  Bell,
  Search,
  Sparkles,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useOnboarding } from "@/lib/onboarding";
import { useState, useCallback, useEffect, type ReactNode } from "react";

const navItems = [
  { icon: Home, label: "Home", to: "/dashboard" as const },
  { icon: ShoppingBag, label: "Orders", to: "/dashboard/orders" as const },
  { icon: Package, label: "Products", to: "/dashboard/products" as const },
  { icon: Users, label: "Customers", to: "/dashboard/customers" as const },
  { icon: BarChart3, label: "Analytics", to: "/dashboard/analytics" as const },
  { icon: Megaphone, label: "Marketing", to: "/dashboard/marketing" as const },
  { icon: Tag, label: "Discounts", to: "/dashboard/discounts" as const },
  { icon: FileText, label: "Content", to: "/dashboard/content" as const },
  { icon: Globe, label: "Online Store", to: "/dashboard/online-store" as const },
  { icon: Settings, label: "Settings", to: "/dashboard/settings" as const },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { storeName } = useOnboarding();
  const displayName = storeName.trim() || "Your store";
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Desktop sidebar — always visible on md+ */}
        <Sidebar currentPath={location.pathname} />

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={closeMobile}
          />
        )}

        {/* Mobile drawer */}
        <div
          className={
            "fixed inset-y-0 left-0 z-50 w-60 border-r border-border bg-card p-3 transition-transform duration-200 ease-in-out md:hidden " +
            (mobileOpen ? "translate-x-0" : "-translate-x-full")
          }
        >
          <div className="mb-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 px-3 py-2">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ background: "var(--terracotta)" }}
              >
                <Sparkles className="h-4 w-4 text-background" />
              </span>
              <span className="font-display text-lg">Kiln</span>
            </Link>
            <button
              onClick={closeMobile}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="grid gap-0.5">
            {navItems.map((it) => {
              const active =
                location.pathname === it.to ||
                (it.to !== "/dashboard" && location.pathname.startsWith(it.to));
              return (
                <Link
                  key={it.label}
                  to={it.to}
                  className={
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition hover-slide-right " +
                    (active
                      ? "bg-foreground/[0.06] font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground")
                  }
                >
                  <it.icon className="h-4 w-4" />
                  {it.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex-1">
          <TopBar storeName={displayName} onMenuToggle={() => setMobileOpen((o) => !o)} />
          <main className="mx-auto max-w-5xl px-6 py-8 anim-fade-in">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ currentPath }: { currentPath: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-border bg-card/50 p-3 md:block">
      <Link to="/" className="mb-6 flex items-center gap-2 px-3 py-2">
        <span
          className="grid h-8 w-8 place-items-center rounded-lg"
          style={{ background: "var(--terracotta)" }}
        >
          <Sparkles className="h-4 w-4 text-background" />
        </span>
        <span className="font-display text-lg">Kiln</span>
      </Link>
      <nav className="grid gap-0.5">
        {navItems.map((it) => {
          const active = currentPath === it.to || (it.to !== "/dashboard" && currentPath.startsWith(it.to));
          return (
            <Link
              key={it.label}
              to={it.to}
              className={
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition hover-slide-right " +
                (active
                  ? "bg-foreground/[0.06] font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground")
              }
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function TopBar({ storeName, onMenuToggle }: { storeName: string; onMenuToggle: () => void }) {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("kiln.auth.user");
      if (rawUser) {
        const u = JSON.parse(rawUser);
        if (u?.avatar) setAvatar(u.avatar);
      }
    } catch {}
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted transition-colors md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-medium">{storeName}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search"
            className="w-64 rounded-full border border-border bg-card py-1.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
        <button className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors">
          <Bell className="h-4 w-4" />
        </button>
        {avatar ? (
          <img
            src={avatar}
            alt="User profile"
            className="h-8 w-8 rounded-full object-cover border border-border"
            onError={() => setAvatar(null)}
          />
        ) : (
          <div className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-xs font-medium text-background">
            {storeName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
}
