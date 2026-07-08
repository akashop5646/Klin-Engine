import { useEffect, useState, useMemo } from "react";
import { ShoppingBag, Search, Plus, Trash2, ArrowUpDown } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { OrderManager, Order, OrderStatus } from "@klin/commerce";

// Persistent manager instance for active session
const orderMgr = new OrderManager();

// Seed initial orders
const initialOrders = [
  new Order("ORD-1042", 124.50),
  new Order("ORD-1043", 89.00),
  new Order("ORD-1044", 245.99),
];
initialOrders[0].status = OrderStatus.Paid;
initialOrders[1].status = OrderStatus.Pending;
initialOrders[2].status = OrderStatus.Fulfilled;

initialOrders.forEach(o => orderMgr.registerOrder(o));

function OrdersPage() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Orders · Kiln";
    // Load initial list
    const list: Order[] = [];
    initialOrders.forEach(o => {
      const live = orderMgr.getOrder(o.id);
      if (live) list.push(live);
    });
    setOrdersList(list);
  }, []);

  const handleSimulateOrder = () => {
    const nextNum = 1045 + ordersList.length;
    const nextId = `ORD-${nextNum}`;
    const pricing = [49.99, 120.00, 15.75, 89.90, 310.00];
    const total = pricing[Math.floor(Math.random() * pricing.length)];
    const newOrder = new Order(nextId, total);
    
    const statuses = [OrderStatus.Pending, OrderStatus.Paid, OrderStatus.Fulfilled];
    newOrder.status = statuses[Math.floor(Math.random() * statuses.length)];

    orderMgr.registerOrder(newOrder);
    setOrdersList(prev => [...prev, newOrder]);
  };

  const handleCancelOrder = (id: string) => {
    const order = orderMgr.getOrder(id);
    if (order) {
      order.status = OrderStatus.Cancelled;
      setOrdersList(prev => prev.map(o => o.id === id ? order : o));
    }
  };

  const filteredOrders = useMemo(() => {
    return ordersList.filter(o => 
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [ordersList, search]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Orders</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage and fulfill your customer orders.</p>
        </div>
        <button 
          onClick={handleSimulateOrder}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Simulate Order
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 anim-fade-in-up anim-delay-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders by number or status..."
            className="w-full rounded-full border border-border bg-card py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden anim-fade-in-up anim-delay-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Order ID</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Customer</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">Total</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
                    <ShoppingBag className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
                  </div>
                  <h3 className="mt-4 font-display text-xl">No orders matched</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try searching another code number.
                  </p>
                </td>
              </tr>
            ) : (
              filteredOrders.map(o => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{o.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">Customer Sim</td>
                  <td className="px-6 py-4">
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: 
                          o.status === OrderStatus.Fulfilled ? "rgba(16, 185, 129, 0.1)" :
                          o.status === OrderStatus.Paid ? "rgba(59, 130, 246, 0.1)" :
                          o.status === OrderStatus.Cancelled ? "rgba(239, 68, 68, 0.1)" :
                          "rgba(245, 158, 11, 0.1)",
                        color:
                          o.status === OrderStatus.Fulfilled ? "rgb(16, 185, 129)" :
                          o.status === OrderStatus.Paid ? "rgb(59, 130, 246)" :
                          o.status === OrderStatus.Cancelled ? "rgb(239, 68, 68)" :
                          "rgb(245, 158, 11)"
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-foreground">${o.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    {o.status !== OrderStatus.Cancelled && (
                      <button 
                        onClick={() => handleCancelOrder(o.id)}
                        className="text-xs px-2.5 py-1 rounded border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
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

export default OrdersPage;

