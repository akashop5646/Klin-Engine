import { useEffect, useState, useMemo } from "react";
import { Users, Search, Plus, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

type CustomerInfo = {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
};

const initialCustomers: CustomerInfo[] = [
  { id: "c1", name: "Sarah Jenkins", email: "sarah.j@example.com", ordersCount: 3, totalSpent: 245.50 },
  { id: "c2", name: "David Miller", email: "david.m@example.com", ordersCount: 1, totalSpent: 89.00 },
  { id: "c3", name: "Elena Rostova", email: "elena.r@example.com", ordersCount: 2, totalSpent: 310.20 },
];

function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerInfo[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Customers · Kiln";
    setCustomers(initialCustomers);
  }, []);

  const handleSimulateCustomer = () => {
    const names = ["Marcus Aurelius", "Lucius Fox", "Barbara Gordon", "Alfred Pennyworth"];
    const emails = ["marcus@roma.edu", "lucius@wayne.com", "oracle@gotham.org", "alfred@manor.com"];
    const idx = Math.floor(Math.random() * names.length);
    
    const newCust: CustomerInfo = {
      id: "c_" + Date.now().toString(36),
      name: names[idx],
      email: emails[idx],
      ordersCount: Math.floor(Math.random() * 5 + 1),
      totalSpent: parseFloat((Math.random() * 500 + 20).toFixed(2)),
    };
    setCustomers(prev => [...prev, newCust]);
  };

  const handleRemoveCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Customers</h1>
          <p className="mt-1 text-sm text-muted-foreground">View and manage your customer accounts.</p>
        </div>
        <button 
          onClick={handleSimulateCustomer}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Simulate Customer
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 anim-fade-in-up anim-delay-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by name or email..."
            className="w-full rounded-full border border-border bg-card py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden anim-fade-in-up anim-delay-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Customer</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Orders Count</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Total Spent</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
                    <Users className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
                  </div>
                  <h3 className="mt-4 font-display text-xl">No customers matched</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try another search query.
                  </p>
                </td>
              </tr>
            ) : (
              filteredCustomers.map(c => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    <div>{c.name}</div>
                    <div className="text-xs text-muted-foreground font-normal">{c.email}</div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{c.ordersCount} orders</td>
                  <td className="px-6 py-4 font-medium text-foreground">${c.totalSpent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleRemoveCustomer(c.id)}
                      className="p-1.5 rounded-lg border border-border hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-colors cursor-pointer"
                      title="Remove customer"
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

export default CustomersPage;

