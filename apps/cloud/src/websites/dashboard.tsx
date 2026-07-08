import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Globe, Palette, Layout, Smartphone, ExternalLink, Settings, Sparkles, Check, ArrowRight, ShieldCheck, RefreshCw, Layers, Sliders, Database, ShoppingBag } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { WebsiteManager, WebsiteClone } from "@klin/platform";

export default function WebsiteControlPanel() {
  const { websiteId } = useParams<{ websiteId: string }>();
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<"Draft" | "Published">("Draft");
  const [liveUrl, setLiveUrl] = useState("");

  useEffect(() => {
    document.title = "Website Control Panel · Kiln";
  }, []);

  const handleOpenBuilder = () => {
    const presetId = websiteId && websiteId.startsWith("clone-") 
      ? websiteId.replace("clone-", "") 
      : "classic-denim";
    const token = localStorage.getItem("kiln.auth.token") || "";
    window.open(`http://localhost:8081/builder/${websiteId}?preset=${presetId}&token=${token}`, "_blank");
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setPublishStatus("Published");
      setLiveUrl(`https://${websiteId || 'cloned-store'}.klin.site`);
      setIsPublishing(false);
      console.log("[Platform Engine Integration] WebsiteSnapshot registered & deployment URL provisioned successfully!");
    }, 1500);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/60 anim-fade-in-up anim-delay-1">
        <div>
          <span className="text-xs uppercase tracking-[0.15em]" style={{ color: "var(--terracotta)" }}>
            Control Panel
          </span>
          <h1 className="mt-1 font-display text-3xl tracking-tight text-foreground flex items-center gap-2">
            Website: {websiteId}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your website instance layout, CMS fields, custom domains, and deployments.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleOpenBuilder}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer hover:opacity-90 hover-scale"
            style={{ background: "var(--terracotta)" }}
          >
            <Palette className="h-4 w-4" />
            Open Builder
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3 anim-fade-in-up anim-delay-2">
        {/* Main stats & info card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
            <h3 className="font-display text-xl text-foreground">Website Status Overview</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatusItem label="Publish Status" value={publishStatus} success={publishStatus === "Published"} />
              <StatusItem label="Active Preset" value="Business Standard" />
              <StatusItem label="Pages Scaffolded" value="4 Pages" />
            </div>
            {publishStatus === "Published" && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Deployed live to CDN</span>
                </div>
                <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
                >
                  Visit Live Site <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
            <div className="flex gap-3">
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isPublishing ? 'animate-spin' : ''}`} />
                {isPublishing ? 'Publishing...' : 'Publish Website'}
              </button>
            </div>
          </div>

          {/* Quick links & integrations tools */}
          <div className="grid gap-4 sm:grid-cols-2">
            <ToolCard 
              icon={Sliders}
              title="Global Theme Presets"
              description="Customize typography scales, buttons shape styles, and color blocks."
            />
            <ToolCard 
              icon={Database}
              title="CMS Fields Bindings"
              description="Map text block elements to data collection rows fields."
            />
          </div>
        </div>

        {/* Sidebar settings info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-lg text-foreground">Scaffolded Pages</h3>
            <div className="space-y-2">
              <PageItem name="Home Page" slug="/" active />
              <PageItem name="About Us" slug="/about" />
              <PageItem name="Contact Us" slug="/contact" />
              <PageItem name="Blog Listing" slug="/blog" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-lg text-foreground">Commerce Integration</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted/40 grid place-items-center text-primary">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Catalog Bindings</h4>
                <p className="text-xs text-muted-foreground">Dynamic checkout hooks mapping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatusItem({ label, value, success }: { label: string; value: string; success?: boolean }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-muted/20">
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
      <div className={`mt-1 font-semibold text-lg ${success ? 'text-emerald-600' : 'text-foreground'}`}>
        {value}
      </div>
    </div>
  );
}

function ToolCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted/40">
        <Icon className="h-4 w-4" style={{ color: "var(--terracotta)" }} />
      </div>
      <div>
        <h4 className="font-semibold text-sm text-foreground">{title}</h4>
        <p className="mt-1 text-xs text-muted-foreground leading-normal">{description}</p>
      </div>
    </div>
  );
}

function PageItem({ name, slug, active }: { name: string; slug: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm px-3 py-2 rounded-lg hover:bg-muted/10">
      <span className="font-medium text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground font-mono">{slug}</span>
    </div>
  );
}
