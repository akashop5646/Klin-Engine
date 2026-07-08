import { useEffect, useState, useMemo } from "react";
import { Tag, Plus, Search, Percent, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

type DiscountInfo = {
  id: string;
  code: string;
  type: string;
  value: string;
  usage: number;
  status: "Active" | "Expired";
};

const initialDiscounts: DiscountInfo[] = [
  { id: "d1", code: "WELCOME10", type: "Percentage", value: "10% off", usage: 142, status: "Active" },
  { id: "d2", code: "FREESHIP", type: "Free Shipping", value: "Free shipping", usage: 89, status: "Active" },
  { id: "d3", code: "SUMMER20", type: "Percentage", value: "20% off", usage: 0, status: "Active" },
];

function DiscountsPage() {
  const [discounts, setDiscounts] = useState<DiscountInfo[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Discounts · Kiln";
    setDiscounts(initialDiscounts);
  }, []);

  const handleCreateDiscount = () => {
    const codes = ["WINTER15", "BLACKFRIDAY", "KILNLOVE", "HOLIDAY30"];
    const chosenCode = codes[Math.floor(Math.random() * codes.length)] + Math.floor(Math.random() * 90 + 10);
    const types = ["Percentage", "Fixed Amount"];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    
    const newVal = chosenType === "Percentage" ? "15% off" : "$15.00 off";

    const newDisc: DiscountInfo = {
      id: "d_" + Date.now().toString(36),
      code: chosenCode,
      type: chosenType,
      value: newVal,
      usage: 0,
      status: "Active",
    };

    console.log("[Platform Engine Integration] Discount registered inside pricing catalog:", newDisc);
    setDiscounts(prev => [...prev, newDisc]);
  };

  const handleRemoveDiscount = (id: string) => {
    setDiscounts(prev => prev.filter(d => d.id !== id));
  };

  const filteredDiscounts = useMemo(() => {
    return discounts.filter(d => 
      d.code.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [discounts, search]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Discounts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create and manage promo codes for checkout checkout operations.</p>
        </div>
        <button 
          onClick={handleCreateDiscount}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Create Discount
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 anim-fade-in-up anim-delay-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search discounts by promo code..."
            className="w-full rounded-full border border-border bg-card py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden anim-fade-in-up anim-delay-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Promo Code</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Type</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Value</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Usage Count</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDiscounts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
                    <Percent className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
                  </div>
                  <h3 className="mt-4 font-display text-xl">No discounts matched</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try searching another promo name.
                  </p>
                </td>
              </tr>
            ) : (
              filteredDiscounts.map(d => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-foreground">{d.code}</td>
                  <td className="px-6 py-4 text-muted-foreground">{d.type}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{d.value}</td>
                  <td className="px-6 py-4 text-muted-foreground">{d.usage} orders</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleRemoveDiscount(d.id)}
                      className="p-1.5 rounded-lg border border-border hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-colors cursor-pointer"
                      title="Remove promo code"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default DiscountsPage;

