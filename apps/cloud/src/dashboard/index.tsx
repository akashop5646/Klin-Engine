import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { ShoppingBag, Check, PartyPopper, X, ChevronDown, ChevronRight, Layout, Globe, Activity, Plus, RefreshCw, BarChart2, Layers } from "lucide-react";
import { useOnboarding, syncProfileFromServer } from "@/lib/onboarding";
import { DashboardLayout } from "@/components/dashboard-layout";
import { PlatformEngine } from "@klin/platform";

function DashboardLayoutWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const isParentRoute = location.pathname === "/dashboard" || location.pathname === "/dashboard/";
  const token = localStorage.getItem("kiln.auth.token");

  useEffect(() => {
    if (!token) {
      navigate("/signup?mode=login");
      return;
    }
    syncProfileFromServer();
  }, [token, navigate]);

  useEffect(() => {
    if (isParentRoute) {
      document.title = "Home · Kiln";
    }
  }, [isParentRoute]);

  if (!token) {
    return null;
  }

  if (!isParentRoute) {
    return <Outlet />;
  }

  return <DashboardComponent />;
}

type DashboardWebsite = {
  id: string;
  name: string;
  status: "Draft" | "Published";
  theme: string;
  domain: string;
  lastEdited: string;
};

type DeploymentLog = {
  id: string;
  version: string;
  website: string;
  status: "Active" | "Superseded";
  timestamp: string;
};

type ActivityLog = {
  id: string;
  action: string;
  target: string;
  time: string;
};

function DashboardComponent() {
  const navigate = useNavigate();
  const { storeName } = useOnboarding();
  const displayName = storeName.trim() || "Terracotta Shop";

  // State
  const [websites, setWebsites] = useState<DashboardWebsite[]>([
    { id: "site-101", name: "Fashion Essentials Hub", status: "Published", theme: "Modern Dark", domain: "fashion.klin.site", lastEdited: "2 mins ago" },
    { id: "site-102", name: "Wellness Lounge", status: "Draft", theme: "Pastel Warm", domain: "wellness.klin.site", lastEdited: "1 hour ago" },
    { id: "site-103", name: "Terracotta Clay Artistry", status: "Published", theme: "Classic Serif", domain: "terracotta.klin.site", lastEdited: "Yesterday" },
  ]);

  const [deployments] = useState<DeploymentLog[]>([
    { id: "d-1", version: "v2.0.4", website: "Fashion Essentials Hub", status: "Active", timestamp: "5 mins ago" },
    { id: "d-2", version: "v2.0.3", website: "Terracotta Clay Artistry", status: "Active", timestamp: "1 day ago" },
    { id: "d-3", version: "v1.9.0", website: "Fashion Essentials Hub", status: "Superseded", timestamp: "3 days ago" },
  ]);

  const [activities] = useState<ActivityLog[]>([
    { id: "act-1", action: "Cloned Template", target: "Standard Clothing Preset", time: "1 hour ago" },
    { id: "act-2", action: "Published Release", target: "v2.0.4 - CDN Edge", time: "5 mins ago" },
    { id: "act-3", action: "Added Product", target: "Terracotta Artisan Pitcher", time: "2 hours ago" },
  ]);

  const stats = useMemo(() => {
    const total = websites.length;
    const published = websites.filter(w => w.status === "Published").length;
    const draft = total - published;
    return {
      total,
      published,
      draft,
      deploymentsCount: deployments.length,
      visitors: "1,248",
      orders: 24,
      revenue: "$1,840.00"
    };
  }, [websites, deployments]);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/60 anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-foreground">
            Workspace: {displayName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">General overview of your workspace websites, deployments, and storefront transactions.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => navigate("/dashboard/online-store")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Create Website
          </button>
          <button
            onClick={() => navigate("/dashboard/analytics")}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition cursor-pointer hover:opacity-90"
            style={{ background: "var(--terracotta)" }}
          >
            <BarChart2 className="h-4 w-4" />
            View Analytics
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 anim-fade-in-up anim-delay-2">
        <StatCard title="Total Websites" value={stats.total} hint={`${stats.published} Live / ${stats.draft} Draft`} />
        <StatCard title="Deployments" value={stats.deploymentsCount} hint="CDN Deployments registered" />
        <StatCard title="Total Visitors" value={stats.visitors} hint="+12% since last week" />
        <StatCard title="Total Revenue" value={stats.revenue} hint="From store checkouts" />
      </div>

      {/* Main Tables Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3 anim-fade-in-up anim-delay-3">
        {/* Recent Websites */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-muted/20 px-6 py-4">
            <h3 className="font-display text-lg text-foreground">Recent Websites</h3>
            <Link to="/dashboard/online-store" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border">
            {websites.map(w => (
              <div key={w.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/5 transition-colors">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{w.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{w.domain}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${w.status === "Published" ? "bg-emerald-500/10 text-emerald-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                    {w.status}
                  </span>
                  <button 
                    onClick={() => navigate(`/dashboard/online-store/builder?preset=business&websiteId=${w.id}`)}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar logs */}
        <div className="space-y-6">
          {/* Recent Deployments */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-lg text-foreground">Recent Deployments</h3>
            <div className="space-y-3">
              {deployments.map(d => (
                <div key={d.id} className="flex items-start justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-foreground">{d.version}</span>
                    <span className="ml-2 font-medium text-muted-foreground">{d.website}</span>
                  </div>
                  <span className="text-muted-foreground">{d.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-lg text-foreground">Recent Activity</h3>
            <div className="space-y-3">
              {activities.map(a => (
                <div key={a.id} className="flex gap-3 text-xs">
                  <Activity className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">{a.action}</span>
                    <span className="text-muted-foreground"> - {a.target}</span>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, hint }: { title: string; value: string | number; hint: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</div>
      <div className="mt-2 font-display text-3xl text-foreground font-extrabold">{value}</div>
      <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

export default DashboardLayoutWrapper;

