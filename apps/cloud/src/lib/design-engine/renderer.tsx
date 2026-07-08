import React, { useState } from "react";
import type { DesignState, SectionInstance, ThemeConfig } from "./types";
import {
  ShoppingCart,
  Menu,
  X,
  Truck,
  RotateCcw,
  Shield,
  Zap,
  Lock,
  BarChart3,
  Star,
  ChevronDown,
  ChevronUp,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
} from "lucide-react";

// ─── Icon Resolver ─────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Truck,
  RotateCcw,
  Shield,
  Zap,
  Lock,
  BarChart3,
  Star,
  ShoppingCart,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
};

function IconByName({ name, size = 24, ...props }: { name: string; size?: number; [k: string]: any }) {
  const Comp = ICON_MAP[name] || Star;
  return <Comp size={size} {...props} />;
}

// ─── Theme → CSS Variables ─────────────────────────────────

function themeToCSS(theme: ThemeConfig): React.CSSProperties {
  const fontSizeMap = {
    small: { heading: "2rem", body: "0.875rem" },
    default: { heading: "2.75rem", body: "1rem" },
    large: { heading: "3.5rem", body: "1.125rem" },
  };
  const hSizes = fontSizeMap[theme.typography.headingSize] || fontSizeMap.default;
  const bSizes = fontSizeMap[theme.typography.bodySize] || fontSizeMap.default;
  const btnRadius =
    theme.buttons.style === "square" ? "4px" : theme.buttons.style === "pill" ? "999px" : "8px";

  return {
    "--sf-primary": theme.colors.primary,
    "--sf-secondary": theme.colors.secondary,
    "--sf-accent": theme.colors.accent,
    "--sf-bg": theme.colors.background,
    "--sf-surface": theme.colors.surface,
    "--sf-text": theme.colors.text,
    "--sf-heading-font": theme.typography.headingFont + ", serif",
    "--sf-body-font": theme.typography.bodyFont + ", sans-serif",
    "--sf-heading-size": hSizes.heading,
    "--sf-body-size": bSizes.body,
    "--sf-btn-radius": btnRadius,
    "--sf-btn-shadow": theme.buttons.shadow ? "0 2px 8px rgba(0,0,0,.12)" : "none",
    "--sf-card-radius": theme.cards.radius + "px",
    "--sf-card-shadow": theme.cards.shadow ? "0 1px 4px rgba(0,0,0,.08)" : "none",
    "--sf-card-border": theme.cards.border ? `1px solid ${theme.colors.text}20` : "none",
  } as React.CSSProperties;
}

// ─── Shared Styles ─────────────────────────────────────────

const sfStyles = `
  .sf-root {
    font-family: var(--sf-body-font);
    font-size: var(--sf-body-size);
    color: var(--sf-text);
    background: var(--sf-bg);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  .sf-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .sf-root img { max-width: 100%; height: auto; display: block; }
  .sf-root a { color: inherit; text-decoration: none; }
  .sf-heading { font-family: var(--sf-heading-font); font-size: var(--sf-heading-size); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; }
  .sf-subheading { font-family: var(--sf-heading-font); font-size: calc(var(--sf-heading-size) * 0.5); font-weight: 500; line-height: 1.3; }
  .sf-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border: none; cursor: pointer;
    font-family: var(--sf-body-font); font-size: 0.875rem; font-weight: 600;
    letter-spacing: 0.02em; transition: all 0.2s ease;
    border-radius: var(--sf-btn-radius); box-shadow: var(--sf-btn-shadow);
  }
  .sf-btn-primary { background: var(--sf-accent); color: var(--sf-bg); }
  .sf-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .sf-btn-outline { background: transparent; color: var(--sf-text); border: 1.5px solid var(--sf-text); }
  .sf-btn-outline:hover { background: var(--sf-text); color: var(--sf-bg); }
  .sf-card {
    border-radius: var(--sf-card-radius); box-shadow: var(--sf-card-shadow);
    border: var(--sf-card-border); overflow: hidden; background: var(--sf-surface);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .sf-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,.1); }
  .sf-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .sf-section { padding: 80px 0; }
  .sf-section-title { font-family: var(--sf-heading-font); font-size: 1.75rem; font-weight: 700; letter-spacing: -0.01em; margin-bottom: 8px; }
  .sf-section-subtitle { font-size: 1rem; opacity: 0.6; margin-bottom: 48px; }
  .sf-section-clickable { cursor: pointer; position: relative; }
  .sf-section-clickable:hover::after {
    content: ''; position: absolute; inset: 0;
    border: 2px solid #3B82F6; border-radius: 4px; pointer-events: none;
  }
`;

// ─── Section Renderers ─────────────────────────────────────

function HeaderSection({ config, theme }: { config: any; theme: ThemeConfig }) {
  return (
    <>
      {config.showAnnouncement && config.announcementText && (
        <div style={{ background: theme.colors.accent, color: theme.colors.background, textAlign: "center", padding: "8px 16px", fontSize: "0.8125rem", fontWeight: 500 }}>
          {config.announcementText}
        </div>
      )}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: `1px solid ${theme.colors.text}10`, background: theme.colors.background }}>
        <span style={{ fontFamily: "var(--sf-heading-font)", fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
          {config.logoText || "Your Store"}
        </span>
        <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {(config.navLinks || []).map((link: any, i: number) => (
            <a key={i} href={link.href} style={{ fontSize: "0.875rem", fontWeight: 500, opacity: 0.7, transition: "opacity 0.15s" }}>
              {link.label}
            </a>
          ))}
          {config.showCart && <ShoppingCart size={20} style={{ opacity: 0.6 }} />}
        </nav>
      </header>
    </>
  );
}

function HeroSection({ config, theme }: { config: any; theme: ThemeConfig }) {
  const heightMap = { small: "360px", medium: "520px", large: "680px", full: "100vh" };
  const h = heightMap[config.height as keyof typeof heightMap] || "520px";
  const hasImage = !!config.backgroundImage;

  return (
    <section style={{
      position: "relative", display: "flex", alignItems: "center",
      justifyContent: config.alignment === "left" ? "flex-start" : config.alignment === "right" ? "flex-end" : "center",
      minHeight: h, padding: "80px 48px",
      background: hasImage ? `url(${config.backgroundImage}) center/cover no-repeat` : theme.colors.surface,
      textAlign: config.alignment as any,
    }}>
      {hasImage && (
        <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${config.overlayOpacity || 0.3})` }} />
      )}
      <div style={{ position: "relative", maxWidth: "720px", zIndex: 1 }}>
        <h1 className="sf-heading" style={{ color: hasImage ? "#fff" : theme.colors.text, marginBottom: "16px" }}>
          {config.headline || "Welcome"}
        </h1>
        {config.subtitle && (
          <p style={{ fontSize: "1.125rem", lineHeight: 1.6, opacity: 0.75, marginBottom: "32px", color: hasImage ? "#fff" : theme.colors.text }}>
            {config.subtitle}
          </p>
        )}
        {config.ctaText && (
          <button className="sf-btn sf-btn-primary">{config.ctaText}</button>
        )}
      </div>
    </section>
  );
}

function FeaturedProductsSection({ config, theme, products = [] }: { config: any; theme: ThemeConfig; products?: any[] }) {
  const count = config.productCount || 4;
  const cols = config.columns || 4;
  
  const displayProducts = products.length > 0
    ? products.slice(0, count)
    : Array.from({ length: count }, (_, i) => ({
        _id: String(i),
        title: `Product ${i + 1}`,
        price: 19.99 + i * 10,
        images: [],
      }));

  return (
    <section className="sf-section">
      <div className="sf-container" style={{ textAlign: "center" }}>
        {config.title && <h2 className="sf-section-title">{config.title}</h2>}
        {config.subtitle && <p className="sf-section-subtitle">{config.subtitle}</p>}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "24px", marginTop: config.subtitle ? 0 : "32px" }}>
          {displayProducts.map((p) => {
            const hasImage = p.images && p.images.length > 0;
            return (
              <div key={p._id} className="sf-card" style={{ cursor: "pointer" }}>
                <div style={{
                  aspectRatio: "3/4",
                  background: hasImage ? `url(${p.images[0]}) center/cover no-repeat` : `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.secondary}30)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2.5rem", opacity: hasImage ? 1 : 0.15,
                }}>
                  {!hasImage && "📦"}
                </div>
                <div style={{ padding: "16px", textAlign: "left" }}>
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "4px", color: "var(--sf-text)" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--sf-accent)" }}>${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RichTextSection({ config }: { config: any }) {
  return (
    <section className="sf-section">
      <div className="sf-container" style={{ maxWidth: "720px", textAlign: config.alignment || "center" }}>
        {config.heading && (
          <h2 className="sf-section-title" style={{ marginBottom: "24px" }}>{config.heading}</h2>
        )}
        {config.body && (
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, opacity: 0.7 }}>{config.body}</p>
        )}
      </div>
    </section>
  );
}

function ImageBannerSection({ config, theme }: { config: any; theme: ThemeConfig }) {
  const heightMap = { small: "300px", medium: "440px", large: "600px" };
  const h = heightMap[config.height as keyof typeof heightMap] || "440px";
  const hasImage = !!config.imageUrl;

  return (
    <section style={{
      position: "relative", display: "flex", alignItems: "center",
      justifyContent: config.alignment === "left" ? "flex-start" : config.alignment === "right" ? "flex-end" : "center",
      minHeight: h, padding: "60px 48px",
      background: hasImage ? `url(${config.imageUrl}) center/cover` : theme.colors.surface,
      textAlign: config.alignment as any,
    }}>
      {hasImage && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
      )}
      <div style={{ position: "relative", maxWidth: "600px", zIndex: 1 }}>
        {config.headline && (
          <h2 className="sf-subheading" style={{ color: hasImage ? "#fff" : theme.colors.text, marginBottom: "12px" }}>
            {config.headline}
          </h2>
        )}
        {config.subtitle && (
          <p style={{ fontSize: "1rem", opacity: 0.8, marginBottom: "24px", color: hasImage ? "#fff" : theme.colors.text }}>
            {config.subtitle}
          </p>
        )}
        {config.ctaText && (
          <button className="sf-btn sf-btn-outline" style={hasImage ? { color: "#fff", borderColor: "#fff" } : {}}>
            {config.ctaText}
          </button>
        )}
      </div>
    </section>
  );
}

function GallerySection({ config, theme }: { config: any; theme: ThemeConfig }) {
  const cols = config.columns || 3;
  const images = config.images?.length
    ? config.images
    : Array.from({ length: 6 }, (_, i) => null);

  return (
    <section className="sf-section">
      <div className="sf-container">
        {config.title && <h2 className="sf-section-title" style={{ textAlign: "center", marginBottom: "40px" }}>{config.title}</h2>}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "12px" }}>
          {images.map((img: string | null, i: number) => (
            <div key={i} style={{
              aspectRatio: "1", borderRadius: "var(--sf-card-radius)",
              background: img ? `url(${img}) center/cover` : `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.secondary}25)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", opacity: img ? 1 : 0.25,
            }}>
              {!img && "🖼️"}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ config, theme }: { config: any; theme: ThemeConfig }) {
  const items = config.items || [];
  const cols = config.columns || 3;

  return (
    <section className="sf-section" style={{ background: theme.colors.surface }}>
      <div className="sf-container" style={{ textAlign: "center" }}>
        {config.title && <h2 className="sf-section-title" style={{ marginBottom: "48px" }}>{config.title}</h2>}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "32px" }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding: "24px" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${theme.colors.accent}15`,
              }}>
                <IconByName name={item.icon} size={24} style={{ color: theme.colors.accent }} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "0.875rem", opacity: 0.6, lineHeight: 1.6 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ config, theme }: { config: any; theme: ThemeConfig }) {
  const items = config.items || [];

  return (
    <section className="sf-section">
      <div className="sf-container" style={{ textAlign: "center" }}>
        {config.title && <h2 className="sf-section-title" style={{ marginBottom: "48px" }}>{config.title}</h2>}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)`, gap: "24px" }}>
          {items.map((item: any, i: number) => (
            <div key={i} className="sf-card" style={{ padding: "32px", textAlign: "left" }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} fill={theme.colors.accent} color={theme.colors.accent} />
                ))}
              </div>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic", opacity: 0.8 }}>
                "{item.quote}"
              </p>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600 }}>{item.author}</p>
                {item.role && <p style={{ fontSize: "0.8125rem", opacity: 0.5 }}>{item.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection({ config, theme }: { config: any; theme: ThemeConfig }) {
  return (
    <section className="sf-section" style={{ background: theme.colors.surface }}>
      <div className="sf-container" style={{ maxWidth: "560px", textAlign: "center" }}>
        {config.title && <h2 className="sf-section-title" style={{ marginBottom: "12px" }}>{config.title}</h2>}
        {config.subtitle && <p style={{ fontSize: "0.9375rem", opacity: 0.6, marginBottom: "32px" }}>{config.subtitle}</p>}
        <div style={{ display: "flex", gap: "8px", maxWidth: "440px", margin: "0 auto" }}>
          <input
            type="email"
            readOnly
            placeholder={config.placeholder || "Enter your email"}
            style={{
              flex: 1, padding: "14px 16px", border: `1px solid ${theme.colors.text}20`,
              borderRadius: "var(--sf-btn-radius)", fontSize: "0.875rem",
              background: theme.colors.background, color: theme.colors.text, outline: "none",
            }}
          />
          <button className="sf-btn sf-btn-primary" style={{ whiteSpace: "nowrap" }}>
            {config.buttonText || "Subscribe"}
          </button>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ config, theme }: { config: any; theme: ThemeConfig }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = config.items || [];

  return (
    <section className="sf-section">
      <div className="sf-container" style={{ maxWidth: "720px" }}>
        {config.title && <h2 className="sf-section-title" style={{ textAlign: "center", marginBottom: "48px" }}>{config.title}</h2>}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ borderBottom: `1px solid ${theme.colors.text}15` }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "20px 0", background: "transparent", border: "none", cursor: "pointer",
                  fontSize: "1rem", fontWeight: 600, color: theme.colors.text, textAlign: "left",
                  fontFamily: "var(--sf-body-font)",
                }}
              >
                {item.question}
                {openIndex === i ? <ChevronUp size={18} style={{ opacity: 0.4 }} /> : <ChevronDown size={18} style={{ opacity: 0.4 }} />}
              </button>
              {openIndex === i && (
                <div style={{ paddingBottom: "20px", fontSize: "0.9375rem", opacity: 0.65, lineHeight: 1.7 }}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnnouncementSection({ config, theme }: { config: any; theme: ThemeConfig }) {
  return (
    <div style={{
      background: theme.colors.accent, color: theme.colors.background,
      textAlign: "center", padding: "10px 24px", fontSize: "0.8125rem", fontWeight: 500,
    }}>
      {config.link ? <a href={config.link}>{config.text}</a> : config.text}
    </div>
  );
}

function FooterSection({ config, theme }: { config: any; theme: ThemeConfig }) {
  const columns = config.columns || [];
  return (
    <footer style={{ background: theme.colors.text === "#FAFAFA" || theme.colors.text === "#FFFFFF" ? theme.colors.surface : theme.colors.text + "08", padding: "64px 0 32px" }}>
      <div className="sf-container">
        <div style={{ display: "grid", gridTemplateColumns: `2fr ${columns.map(() => "1fr").join(" ")}`, gap: "48px", marginBottom: "48px" }}>
          <div>
            <h3 style={{ fontFamily: "var(--sf-heading-font)", fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px" }}>
              {config.companyName}
            </h3>
            <p style={{ fontSize: "0.875rem", opacity: 0.6, lineHeight: 1.7, maxWidth: "280px" }}>
              {config.description}
            </p>
            {config.showSocial && (
              <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                <Instagram size={18} style={{ opacity: 0.5, cursor: "pointer" }} />
                <Twitter size={18} style={{ opacity: 0.5, cursor: "pointer" }} />
                <Facebook size={18} style={{ opacity: 0.5, cursor: "pointer" }} />
              </div>
            )}
          </div>
          {columns.map((col: any, i: number) => (
            <div key={i}>
              <h4 style={{ fontSize: "0.8125rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px", opacity: 0.5 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {(col.links || []).map((link: any, j: number) => (
                  <li key={j}>
                    <a href={link.href} style={{ fontSize: "0.875rem", opacity: 0.65, transition: "opacity 0.15s" }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${theme.colors.text}10`, paddingTop: "24px", textAlign: "center", fontSize: "0.8125rem", opacity: 0.4 }}>
          © {new Date().getFullYear()} {config.companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── Section Renderer Map ──────────────────────────────────

const SECTION_RENDERERS: Record<string, React.FC<{ config: any; theme: ThemeConfig; products?: any[] }>> = {
  header: HeaderSection,
  hero: HeroSection,
  "featured-products": FeaturedProductsSection,
  "rich-text": RichTextSection,
  "image-banner": ImageBannerSection,
  gallery: GallerySection,
  features: FeaturesSection,
  testimonials: TestimonialsSection,
  newsletter: NewsletterSection,
  faq: FaqSection,
  announcement: AnnouncementSection,
  footer: FooterSection,
};

// ─── Main Renderer ─────────────────────────────────────────

export function StorefrontRenderer({
  design,
  currentPageId,
  onSectionClick,
  selectedSectionId,
  products = [],
}: {
  design: DesignState;
  currentPageId: string;
  onSectionClick?: (sectionId: string) => void;
  selectedSectionId?: string | null;
  products?: any[];
}) {
  const page = design.pages.find((p) => p.id === currentPageId);

  if (!page) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "Inter, sans-serif", color: "#666", fontSize: "0.875rem" }}>
        Select a page to preview
      </div>
    );
  }

  const visibleSections = page.sections.filter((s) => s.isVisible);

  return (
    <>
      <style>{sfStyles}</style>
      <div className="sf-root" style={themeToCSS(design.theme)}>
        {visibleSections.map((section) => {
          const Renderer = SECTION_RENDERERS[section.type];
          if (!Renderer) return null;

          const isSelected = selectedSectionId === section.id;

          return (
            <div
              key={section.id}
              data-section-id={section.id}
              onClick={(e) => {
                e.stopPropagation();
                onSectionClick?.(section.id);
              }}
              style={{
                position: "relative",
                cursor: onSectionClick ? "pointer" : undefined,
                outline: isSelected ? "2px solid #3B82F6" : undefined,
                outlineOffset: isSelected ? "-2px" : undefined,
                transition: "outline 0.15s ease",
              }}
            >
              <Renderer config={section.config} theme={design.theme} products={products} />
            </div>
          );
        })}
      </div>
    </>
  );
}
