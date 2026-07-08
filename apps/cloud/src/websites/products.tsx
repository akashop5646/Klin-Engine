import { useEffect, useState, useMemo } from "react";
import { Package, Plus, Search, Trash2, ArrowUpRight } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { CatalogManager, Product } from "@klin/commerce";

// Persistent manager instance for active session
const catalog = new CatalogManager();

// Seed initial products
const initialProducts = [
  new Product("p1", "Minimalist Terracotta Vase", "M-TERRA-01"),
  new Product("p2", "Linen Lounge Dress", "L-DRESS-02"),
  new Product("p3", "Ceramic Dinner Plate Set", "C-PLATE-03"),
];
initialProducts.forEach(p => catalog.addProduct(p));

function ProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Products · Kiln";
    // Load products from CatalogManager
    const list: Product[] = [];
    initialProducts.forEach(p => {
      const live = catalog.getProduct(p.id);
      if (live) list.push(live);
    });
    setProductsList(list);
  }, []);

  const handleAddProduct = () => {
    const nextId = "p_" + Date.now().toString(36);
    const names = [
      "Heavyweight Organic Tee",
      "Scented Soy Candle",
      "Cork Yoga Mat",
      "Drip Coffee Brewer",
      "Wool Knit Socks"
    ];
    const chosenName = names[Math.floor(Math.random() * names.length)];
    const sku = "SKU-" + Math.floor(Math.random() * 9000 + 1000);
    const newProd = new Product(nextId, chosenName, sku);
    
    catalog.addProduct(newProd);
    setProductsList(prev => [...prev, newProd]);
  };

  const handleRemoveProduct = (id: string) => {
    // Modify local list representation
    setProductsList(prev => prev.filter(p => p.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return productsList.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    );
  }, [productsList, search]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your product catalog.</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add product
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 anim-fade-in-up anim-delay-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name or SKU..."
            className="w-full rounded-full border border-border bg-card py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden anim-fade-in-up anim-delay-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Product Name</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">SKU</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
                    <Package className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
                  </div>
                  <h3 className="mt-4 font-display text-xl">No products matched</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try another search query or add a product.
                  </p>
                </td>
              </tr>
            ) : (
              filteredProducts.map(p => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-muted/30 grid place-items-center text-[11px] font-bold text-muted-foreground">
                      PR
                    </div>
                    {p.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{p.sku}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleRemoveProduct(p.id)}
                        className="p-1.5 rounded-lg border border-border hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

export default ProductsPage;

