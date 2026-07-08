import { useEffect, useState } from "react";
import { FileText, Plus, Layout, Image, PenLine, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { PlatformEngine } from "@klin/platform";

type ContentItem = {
  id: string;
  title: string;
  type: "page" | "post" | "media";
  date: string;
};

const initialContent: ContentItem[] = [
  { id: "cnt1", title: "About Us Page", type: "page", date: "June 24, 2026" },
  { id: "cnt2", title: "Welcome to our new store!", type: "post", date: "June 28, 2026" },
  { id: "cnt3", title: "Hero Banner.jpg", type: "media", date: "July 01, 2026" },
];

function ContentPage() {
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "page" | "post" | "media">("all");

  useEffect(() => {
    document.title = "Content · Kiln";
    setContentList(initialContent);
  }, []);

  const handleCreatePost = () => {
    const titles = [
      "Summer Collection Launch",
      "Sustainable Sourcing Practices",
      "Behind the Scenes: Handcrafting Terracotta",
      "Designing a Minimalist Workspace",
    ];
    const nextTitle = titles[Math.floor(Math.random() * titles.length)];
    const newItem: ContentItem = {
      id: "cnt_" + Date.now().toString(36),
      title: nextTitle,
      type: "post",
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    console.log("[Platform Engine Integration] Content post registered via platform SDK:", newItem);
    setContentList(prev => [newItem, ...prev]);
  };

  const handleRemoveItem = (id: string) => {
    setContentList(prev => prev.filter(c => c.id !== id));
  };

  const pageCount = contentList.filter(c => c.type === "page").length;
  const postCount = contentList.filter(c => c.type === "post").length;
  const mediaCount = contentList.filter(c => c.type === "media").length;

  const filteredContent = contentList.filter(c => activeTab === "all" || c.type === activeTab);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Content</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your store's static pages, blog articles, and media library.</p>
        </div>
        <button 
          onClick={handleCreatePost}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Create Blog Post
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 anim-fade-in-up anim-delay-2">
        <ContentCard
          icon={Layout}
          title="Pages"
          description="Static info pages like About and FAQ."
          count={pageCount}
          active={activeTab === "page"}
          onClick={() => setActiveTab(activeTab === "page" ? "all" : "page")}
        />
        <ContentCard
          icon={PenLine}
          title="Blog posts"
          description="News articles and updates."
          count={postCount}
          active={activeTab === "post"}
          onClick={() => setActiveTab(activeTab === "post" ? "all" : "post")}
        />
        <ContentCard
          icon={Image}
          title="Media"
          description="Images, graphics, and visual assets."
          count={mediaCount}
          active={activeTab === "media"}
          onClick={() => setActiveTab(activeTab === "media" ? "all" : "media")}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card overflow-hidden anim-fade-in-up anim-delay-3">
        <div className="flex items-center justify-between border-b border-border bg-muted/20 px-6 py-4">
          <h3 className="font-medium text-foreground">Content Catalog ({filteredContent.length})</h3>
          <span className="text-xs text-muted-foreground">Click cards above to filter list</span>
        </div>
        
        <div className="divide-y divide-border">
          {filteredContent.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto opacity-30 mb-2" />
              <p className="text-sm">No matching content items found.</p>
            </div>
          ) : (
            filteredContent.map(item => (
              <div key={item.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/10 transition-colors">
                <div>
                  <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                  <div className="flex gap-2 items-center mt-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground uppercase tracking-wide">
                      {item.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-1.5 rounded-lg border border-border hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function ContentCard({ 
  icon: Icon, 
  title, 
  description, 
  count,
  active,
  onClick
}: { 
  icon: any; 
  title: string; 
  description: string; 
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={`rounded-2xl border p-6 text-left transition hover:shadow-[var(--shadow-card)] cursor-pointer ${active ? 'border-foreground bg-foreground/[0.02]' : 'border-border bg-card'}`}
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted/40">
        <Icon className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
      </div>
      <h3 className="mt-4 font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground leading-normal">{description}</p>
      <p className="mt-3 text-xs font-semibold text-muted-foreground">{count} items active</p>
    </button>
  );
}

export default ContentPage;
