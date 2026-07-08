import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Palette, Layout, Smartphone, ExternalLink, Settings, Sparkles, Check, ArrowRight, Plus, Trash2, Copy, Send, X, Layers, Languages, HelpCircle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { getTemplates, templateToDesignState } from "@/lib/design-engine/templates";
import type { ThemeConfig } from "@/lib/design-engine/types";
import { WebsiteClone, PlatformSDK } from "@klin/platform";

interface UserWebsite {
  id: string;
  name: string;
  status: "Draft" | "Published" | "Archived";
  theme: string;
  templateId: string;
  domain: string;
  updated: string;
}

export default function OnlineStorePage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const templates = getTemplates();

  // Active website lists
  const [websites, setWebsites] = useState<UserWebsite[]>([
    { id: "site-101", name: "Fashion Essentials Hub", status: "Published", theme: "Modern Dark", templateId: "streetwear-capsule", domain: "fashion.klin.site", updated: "2 mins ago" },
    { id: "site-102", name: "Wellness Lounge", status: "Draft", theme: "Pastel Warm", templateId: "classic-denim", domain: "wellness.klin.site", updated: "1 hour ago" },
  ]);

  // Filters
  const [filterTab, setFilterTab] = useState<"all" | "Draft" | "Published" | "Archived">("all");

  // Popup form state
  const [showWizard, setShowWizard] = useState(false);

  // Wizard fields
  const [webName, setWebName] = useState("");
  const [businessType, setBusinessType] = useState("retail");
  const [selectedTemplate, setSelectedTemplate] = useState("classic-denim");
  const [selectedTheme, setSelectedTheme] = useState("Clean Modern");
  const [primaryColor, setPrimaryColor] = useState("#D97706");
  const [selectedPages, setSelectedPages] = useState<Record<string, boolean>>({
    Home: true,
    About: true,
    Products: true,
    Contact: true,
  });
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");

  useEffect(() => {
    document.title = "Online Store · Kiln";
    try {
      const rawUser = localStorage.getItem("kiln.auth.user");
      if (rawUser) {
        const u = JSON.parse(rawUser);
        if (u?.id) setUserId(u.id);
      }
    } catch {}
  }, []);

  const handleCreateWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webName.trim()) {
      alert("Please provide a website name.");
      return;
    }

    const cloner = new WebsiteClone();
    const clonedId = cloner.cloneWebsiteInstance(selectedTemplate);
    
    // Initialize the design in the database immediately!
    const tpl = getTemplates().find((t) => t.id === selectedTemplate);
    if (tpl) {
      try {
        const ds = templateToDesignState(tpl);
        const sdk = new PlatformSDK();
        await sdk.createWebsiteDesign(
          clonedId,
          ds.templateId,
          ds.theme,
          ds.pages
        );
        console.log(`Successfully initialized store design in database for website: ${clonedId}`);
      } catch (err) {
        console.error("Failed to initialize design in database:", err);
      }
    }

    const newSite: UserWebsite = {
      id: clonedId,
      name: webName,
      status: "Draft",
      theme: selectedTheme,
      templateId: selectedTemplate,
      domain: `${webName.toLowerCase().replace(/\s+/g, "-")}.klin.site`,
      updated: "Just now",
    };

    setWebsites(prev => [...prev, newSite]);
    setShowWizard(false);

    // Redirect directly to website control panel detailed page route
    navigate(`/dashboard/online-store/${clonedId}`);
  };

  const handleDuplicate = (id: string) => {
    const original = websites.find(w => w.id === id);
    if (original) {
      const newSite: UserWebsite = {
        ...original,
        id: `site-${Date.now()}`,
        name: `${original.name} (Copy)`,
        status: "Draft",
        updated: "Just now"
      };
      setWebsites(prev => [...prev, newSite]);
    }
  };

  const handleDelete = (id: string) => {
    setWebsites(prev => prev.filter(w => w.id !== id));
  };

  const filteredWebsites = useMemo(() => {
    return websites.filter(w => filterTab === "all" || w.status === filterTab);
  }, [websites, filterTab]);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/60 anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-foreground flex items-center gap-2">
            Online Store
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Select, customize, and publish professional themes for your storefront.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowWizard(true)}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer hover:opacity-90 hover-scale"
            style={{ background: "var(--terracotta)" }}
          >
            <Plus className="h-4 w-4" />
            New Website
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b border-border/50 pb-px text-sm">
        {(["all", "Draft", "Published", "Archived"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer ${filterTab === tab ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {tab === "all" ? "All Sites" : tab}
          </button>
        ))}
      </div>

      {/* Websites Grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWebsites.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3 text-center py-16 text-muted-foreground">
            <Globe className="h-10 w-10 mx-auto opacity-30 mb-2" />
            <p>No websites found in this category.</p>
          </div>
        ) : (
          filteredWebsites.map(site => (
            <div key={site.id} className="rounded-2xl border border-border bg-card p-5 space-y-4 hover:shadow-md transition">
              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border uppercase ${site.status === "Published" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"}`}>
                  {site.status}
                </span>
                <h3 className="font-display text-lg mt-3 text-foreground font-semibold">{site.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Domain: {site.domain}</p>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground font-mono pt-2 border-t border-border/40">
                <span>Theme: {site.theme}</span>
                <span>Edited {site.updated}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => navigate(`/dashboard/online-store/${site.id}`)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted transition cursor-pointer"
                >
                  <Settings className="h-3 w-3" />
                  Control Panel
                </button>
                <button
                  onClick={() => window.open(`http://localhost:8081/builder/${site.id}?preset=${site.templateId}`, "_blank")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg text-white px-3 py-2 text-xs font-semibold transition cursor-pointer"
                  style={{ background: "var(--terracotta)" }}
                >
                  <Palette className="h-3 w-3" />
                  Open Builder
                </button>
              </div>

              <div className="flex gap-2 justify-end pt-2 border-t border-border/20">
                <button 
                  onClick={() => handleDuplicate(site.id)}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
                  title="Duplicate site"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => handleDelete(site.id)}
                  className="p-1.5 rounded hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors cursor-pointer"
                  title="Delete site"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Website Wizard Popup Modal */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden anim-fade-in-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/80 p-5">
              <div>
                <h3 className="font-display text-xl text-foreground">Create New Website Instance</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Scaffold website pages and setup localized defaults.</p>
              </div>
              <button 
                onClick={() => setShowWizard(false)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleCreateWebsite} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Website Name</label>
                  <input 
                    placeholder="e.g. My Accessories Boutique"
                    value={webName}
                    onChange={(e) => setWebName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Business Category</label>
                  <select 
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="retail">E-Commerce & Retail</option>
                    <option value="portfolio">Creative Portfolio</option>
                    <option value="services">Business Services</option>
                    <option value="agency">Design Agency</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Original Template</label>
                  <select 
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="classic-denim">Classic Denim Preset</option>
                    <option value="streetwear-capsule">Streetwear Capsule Collection</option>
                    <option value="minimal-elegance">Minimal Elegance Template</option>
                    <option value="luxury-dark">Luxury Dark Preset</option>
                    <option value="bold-modern">Bold Modern Template</option>
                    <option value="warm-organic">Warm & Organic Preset</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Theme Font Profile</label>
                  <select 
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="Clean Modern">Clean Modern (Inter + Inter)</option>
                    <option value="Classic Serif">Elegant Serif (Instrument + Inter)</option>
                    <option value="Modern Dark">Vibrant Accent Dark</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Scaffold Starter Pages</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.keys(selectedPages).map(pageName => (
                    <button
                      type="button"
                      key={pageName}
                      onClick={() => setSelectedPages(prev => ({ ...prev, [pageName]: !prev[pageName] }))}
                      className={`flex items-center justify-between border px-3 py-2 rounded-xl text-xs font-medium cursor-pointer ${selectedPages[pageName] ? 'border-foreground bg-foreground/[0.02]' : 'border-border'}`}
                    >
                      {pageName}
                      <Check className={`h-3.5 w-3.5 ${selectedPages[pageName] ? 'opacity-100' : 'opacity-0'}`} style={{ color: "var(--terracotta)" }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Language Locale</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="English">English (US)</option>
                    <option value="Spanish">Español (ES)</option>
                    <option value="French">Français (FR)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Currency Default</label>
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Primary Accent Color Code</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="color" 
                    value={primaryColor} 
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded border border-border overflow-hidden cursor-pointer"
                  />
                  <input 
                    value={primaryColor} 
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">SEO Title Meta</label>
                <input 
                  placeholder="e.g. Curated Goods | Accessories Shop"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">SEO Description</label>
                <textarea 
                  placeholder="Provide keywords description for search rankings optimization."
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                />
              </div>

              {/* Modal Actions Footer */}
              <div className="flex justify-end gap-2 pt-4 border-t border-border/80">
                <button
                  type="button"
                  onClick={() => setShowWizard(false)}
                  className="px-4 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-muted-foreground hover:bg-muted transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-white text-xs font-semibold transition cursor-pointer hover:opacity-90"
                  style={{ background: "var(--terracotta)" }}
                >
                  Create Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

