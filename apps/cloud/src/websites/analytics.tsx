import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

function AnalyticsPage() {
  const [sales, setSales] = useState(4820.50);
  const [sessions, setSessions] = useState(1280);
  const [rate, setRate] = useState(3.2);
  const [aov, setAov] = useState(114.77);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    document.title = "Analytics · Kiln";
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSales(prev => prev + Math.floor(Math.random() * 200 + 10));
      setSessions(prev => prev + Math.floor(Math.random() * 50 + 5));
      setRate(prev => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(2)));
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track your store's live traffic and sales metrics.</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4 anim-fade-in-up anim-delay-2">
        <StatCard title="Total sales" value={`$${sales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} change={12} />
        <StatCard title="Sessions" value={sessions.toString()} change={8} />
        <StatCard title="Conversion rate" value={`${rate}%`} change={4} />
        <StatCard title="Average order value" value={`$${aov.toFixed(2)}`} change={1} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 anim-fade-in-up anim-delay-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-medium text-foreground">Sales over time</h3>
          <div className="mt-4 flex h-48 items-end justify-between gap-1.5 px-4">
            <div className="w-1/6 bg-foreground/[0.05] h-12 rounded-t transition-all hover:bg-foreground/20" />
            <div className="w-1/6 bg-foreground/[0.05] h-20 rounded-t transition-all hover:bg-foreground/20" />
            <div className="w-1/6 bg-foreground/[0.05] h-24 rounded-t transition-all hover:bg-foreground/20" />
            <div className="w-1/6 bg-foreground/[0.05] h-32 rounded-t transition-all hover:bg-foreground/20" />
            <div className="w-1/6 bg-foreground/10 h-40 rounded-t transition-all hover:bg-foreground/25" />
            <div className="w-1/6 bg-foreground h-44 rounded-t transition-all" style={{ backgroundColor: "var(--terracotta)" }} />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>JAN</span>
            <span>FEB</span>
            <span>MAR</span>
            <span>APR</span>
            <span>MAY</span>
            <span>JUN</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-medium text-foreground">Top products</h3>
            <p className="text-xs text-muted-foreground">Most popular items in the active catalog.</p>
          </div>
          <div className="mt-4 space-y-3 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">1. Minimalist Terracotta Vase</span>
              <span className="text-muted-foreground">42 sales</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">2. Linen Lounge Dress</span>
              <span className="text-muted-foreground">29 sales</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">3. Ceramic Dinner Plate Set</span>
              <span className="text-muted-foreground">18 sales</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 anim-fade-in-up anim-delay-4">
        <h3 className="font-medium text-foreground">Visitors by source</h3>
        <div className="mt-4 space-y-3">
          <SourceBar label="Direct Traffic" pct={62} />
          <SourceBar label="Social Media Referral" pct={25} />
          <SourceBar label="Search Engine (Organic)" pct={13} />
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, change }: { title: string; value: string; change: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="mt-1 font-display text-3xl text-foreground">{value}</div>
      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
        {change > 0 ? (
          <TrendingUp className="h-3 w-3 text-emerald-600" />
        ) : change < 0 ? (
          <TrendingDown className="h-3 w-3 text-destructive" />
        ) : (
          <Minus className="h-3 w-3" />
        )}
        <span>{change === 0 ? "No change" : `+${change}% vs last month`}</span>
      </div>
    </div>
  );
}

function SourceBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span>{label}</span>
        <span className="text-muted-foreground">{pct}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-muted/40 overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ width: `${pct}%`, backgroundColor: "var(--terracotta)" }}
        />
      </div>
    </div>
  );
}

export default AnalyticsPage;

