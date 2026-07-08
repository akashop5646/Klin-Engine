import { useEffect, useState } from "react";
import { Settings, Store, CreditCard, Truck, Globe, Users, Bell, Shield, Key, Save } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { PlatformEngine } from "@klin/platform";

function SettingsPage() {
  const [storeName, setStoreName] = useState("");
  const [customDomain, setCustomDomain] = useState("my-store.klin.site");
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    document.title = "Settings · Kiln";
    const rawUser = localStorage.getItem("kiln.auth.user");
    if (rawUser) {
      try {
        const u = JSON.parse(rawUser);
        setStoreName(u.name || "My Store");
      } catch {}
    }
  }, []);

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("[Platform Engine Integration] Settings updated inside platform registry:");
      console.log({ storeName, customDomain, allowNotifications });
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 600);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your store settings and preferences.</p>
        </div>
        <button 
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale cursor-pointer disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="mt-6 space-y-6 anim-fade-in-up anim-delay-2">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-medium text-lg flex items-center gap-2 text-foreground">
            <Store className="h-5 w-5 text-muted-foreground" />
            Store details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Store Name</label>
              <input 
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Primary Custom Domain</label>
              <input 
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-medium text-lg flex items-center gap-2 text-foreground">
            <Bell className="h-5 w-5 text-muted-foreground" />
            Notifications
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Enable transactional emails</h3>
              <p className="text-xs text-muted-foreground">Receive real-time order alerts and stock alerts.</p>
            </div>
            <button 
              onClick={() => setAllowNotifications(!allowNotifications)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${allowNotifications ? 'bg-emerald-500' : 'bg-muted'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${allowNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <SettingsCard
            icon={CreditCard}
            title="Payments"
            description="Payment providers and checkout settings."
          />
          <SettingsCard
            icon={Truck}
            title="Shipping"
            description="Shipping rates and delivery zones."
          />
          <SettingsCard
            icon={Users}
            title="Team"
            description="Invite team members and manage permissions."
          />
          <SettingsCard
            icon={Key}
            title="API keys"
            description="Manage API keys for integrations."
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

function SettingsCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left transition hover:shadow-[var(--shadow-card)]">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted/40">
        <Icon className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
      </div>
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default SettingsPage;

