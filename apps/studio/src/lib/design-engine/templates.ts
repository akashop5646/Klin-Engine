import type { DesignState, ThemeConfig, PageConfig } from "./types";
import { generateId } from "./id";

// ─── Shared Section Factories ──────────────────────────────

function makeHeader(cfg: Record<string, any> = {}) {
  return {
    id: generateId("sec"),
    type: "header" as const,
    isVisible: true,
    config: {
      logoText: "Your Store",
      navLinks: [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/products" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      showCart: true,
      showAnnouncement: false,
      announcementText: "",
      ...cfg,
    },
  };
}

function makeFooter(cfg: Record<string, any> = {}) {
  return {
    id: generateId("sec"),
    type: "footer" as const,
    isVisible: true,
    config: {
      companyName: "Your Store",
      description: "Premium products for everyday life.",
      columns: [
        {
          title: "Shop",
          links: [
            { label: "All Products", href: "/products" },
            { label: "New Arrivals", href: "/products" },
            { label: "Sale", href: "/products" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ],
      showSocial: true,
      socialLinks: { instagram: "#", twitter: "#", facebook: "#" },
      ...cfg,
    },
  };
}

// ─── Template Definitions ──────────────────────────────────

const TEMPLATES: Array<{
  id: string;
  name: string;
  description: string;
  category: string;
  theme: ThemeConfig;
  pages: PageConfig[];
}> = [
  // ── 1. Minimal Elegance ───────────────────────────────
  {
    id: "minimal-elegance",
    name: "Minimal Elegance",
    description: "Clean, refined design with generous whitespace. Perfect for curated brands.",
    category: "Fashion & Lifestyle",
    theme: {
      colors: {
        primary: "#18181B",
        secondary: "#71717A",
        accent: "#18181B",
        background: "#FFFFFF",
        surface: "#FAFAFA",
        text: "#18181B",
      },
      typography: {
        headingFont: "Playfair Display",
        bodyFont: "Inter",
        headingSize: "default",
        bodySize: "default",
      },
      buttons: { style: "square", shadow: false },
      cards: { radius: 0, shadow: false, border: true },
      animations: "fade",
    },
    pages: [
      {
        id: generateId("pg"),
        title: "Home",
        slug: "home",
        isVisible: true,
        sections: [
          makeHeader(),
          {
            id: generateId("sec"),
            type: "hero",
            isVisible: true,
            config: {
              headline: "Timeless Essentials",
              subtitle: "Curated pieces designed to last a lifetime.",
              ctaText: "Shop Collection",
              ctaLink: "/products",
              backgroundImage: "",
              overlayOpacity: 0.3,
              alignment: "center",
              height: "large",
            },
          },
          {
            id: generateId("sec"),
            type: "featured-products",
            isVisible: true,
            config: {
              title: "New Arrivals",
              subtitle: "Our latest additions",
              productCount: 4,
              layout: "grid",
              columns: 4,
            },
          },
          {
            id: generateId("sec"),
            type: "image-banner",
            isVisible: true,
            config: {
              imageUrl: "",
              headline: "The Art of Less",
              subtitle: "Every detail considered. Nothing unnecessary.",
              ctaText: "Our Story",
              ctaLink: "/about",
              alignment: "left",
              height: "medium",
            },
          },
          {
            id: generateId("sec"),
            type: "newsletter",
            isVisible: true,
            config: {
              title: "Stay in the Loop",
              subtitle: "Be the first to know about new collections and exclusive offers.",
              buttonText: "Subscribe",
              placeholder: "Enter your email",
            },
          },
          makeFooter(),
        ],
      },
    ],
  },

  // ── 2. Bold & Modern ──────────────────────────────────
  {
    id: "bold-modern",
    name: "Bold & Modern",
    description: "High contrast with vivid accent. Great for streetwear and tech accessories.",
    category: "Streetwear & Tech",
    theme: {
      colors: {
        primary: "#000000",
        secondary: "#525252",
        accent: "#EF4444",
        background: "#FFFFFF",
        surface: "#F5F5F5",
        text: "#0A0A0A",
      },
      typography: {
        headingFont: "Inter",
        bodyFont: "Inter",
        headingSize: "large",
        bodySize: "default",
      },
      buttons: { style: "square", shadow: false },
      cards: { radius: 8, shadow: false, border: true },
      animations: "slide",
    },
    pages: [
      {
        id: generateId("pg"),
        title: "Home",
        slug: "home",
        isVisible: true,
        sections: [
          makeHeader({ showAnnouncement: true, announcementText: "🔥 FREE SHIPPING ON ORDERS OVER $75" }),
          {
            id: generateId("sec"),
            type: "hero",
            isVisible: true,
            config: {
              headline: "DROP 003",
              subtitle: "Limited edition. Once it's gone, it's gone.",
              ctaText: "Shop Now",
              ctaLink: "/products",
              backgroundImage: "",
              overlayOpacity: 0.5,
              alignment: "left",
              height: "full",
            },
          },
          {
            id: generateId("sec"),
            type: "featured-products",
            isVisible: true,
            config: {
              title: "TRENDING",
              subtitle: "",
              productCount: 6,
              layout: "grid",
              columns: 3,
            },
          },
          {
            id: generateId("sec"),
            type: "features",
            isVisible: true,
            config: {
              title: "Why Us",
              items: [
                { icon: "Truck", title: "Free Shipping", description: "On all orders over $75" },
                { icon: "RotateCcw", title: "Easy Returns", description: "30-day hassle-free returns" },
                { icon: "Shield", title: "Secure Checkout", description: "SSL encrypted payment" },
              ],
              columns: 3,
            },
          },
          makeFooter(),
        ],
      },
    ],
  },

  // ── 3. Warm & Organic ─────────────────────────────────
  {
    id: "warm-organic",
    name: "Warm & Organic",
    description: "Earthy tones with a natural feel. Ideal for handmade, food, or wellness brands.",
    category: "Handmade & Wellness",
    theme: {
      colors: {
        primary: "#78350F",
        secondary: "#92400E",
        accent: "#D97706",
        background: "#FFFBEB",
        surface: "#FEF3C7",
        text: "#451A03",
      },
      typography: {
        headingFont: "Playfair Display",
        bodyFont: "Inter",
        headingSize: "default",
        bodySize: "default",
      },
      buttons: { style: "rounded", shadow: false },
      cards: { radius: 16, shadow: true, border: false },
      animations: "fade",
    },
    pages: [
      {
        id: generateId("pg"),
        title: "Home",
        slug: "home",
        isVisible: true,
        sections: [
          makeHeader({ logoText: "Harvest Co." }),
          {
            id: generateId("sec"),
            type: "hero",
            isVisible: true,
            config: {
              headline: "Nourish Your Rituals",
              subtitle: "Handcrafted goods made with intention.",
              ctaText: "Explore",
              ctaLink: "/products",
              backgroundImage: "",
              overlayOpacity: 0.2,
              alignment: "center",
              height: "large",
            },
          },
          {
            id: generateId("sec"),
            type: "featured-products",
            isVisible: true,
            config: {
              title: "Favorites",
              subtitle: "What our community loves most",
              productCount: 3,
              layout: "grid",
              columns: 3,
            },
          },
          {
            id: generateId("sec"),
            type: "testimonials",
            isVisible: true,
            config: {
              title: "What People Say",
              items: [
                { quote: "The quality is unlike anything I've experienced.", author: "Sarah M.", role: "Verified Buyer" },
                { quote: "Beautiful packaging and incredible scents.", author: "James L.", role: "Repeat Customer" },
                { quote: "I gift these to everyone. They always love it.", author: "Anna K.", role: "Verified Buyer" },
              ],
              layout: "cards",
            },
          },
          makeFooter({ companyName: "Harvest Co." }),
        ],
      },
    ],
  },

  // ── 4. Luxury Dark ────────────────────────────────────
  {
    id: "luxury-dark",
    name: "Luxury Dark",
    description: "Sophisticated dark mode with gold accents. For jewelry, watches, luxury goods.",
    category: "Luxury & Jewelry",
    theme: {
      colors: {
        primary: "#FBBF24",
        secondary: "#A1A1AA",
        accent: "#FBBF24",
        background: "#09090B",
        surface: "#18181B",
        text: "#FAFAFA",
      },
      typography: {
        headingFont: "Playfair Display",
        bodyFont: "Inter",
        headingSize: "large",
        bodySize: "default",
      },
      buttons: { style: "square", shadow: false },
      cards: { radius: 4, shadow: false, border: true },
      animations: "luxury",
    },
    pages: [
      {
        id: generateId("pg"),
        title: "Home",
        slug: "home",
        isVisible: true,
        sections: [
          makeHeader({ logoText: "Maison" }),
          {
            id: generateId("sec"),
            type: "hero",
            isVisible: true,
            config: {
              headline: "Crafted for Eternity",
              subtitle: "Where artistry meets legacy.",
              ctaText: "View Collection",
              ctaLink: "/products",
              backgroundImage: "",
              overlayOpacity: 0.6,
              alignment: "center",
              height: "full",
            },
          },
          {
            id: generateId("sec"),
            type: "featured-products",
            isVisible: true,
            config: {
              title: "The Collection",
              subtitle: "Meticulously crafted pieces",
              productCount: 4,
              layout: "grid",
              columns: 2,
            },
          },
          {
            id: generateId("sec"),
            type: "rich-text",
            isVisible: true,
            config: {
              heading: "Our Legacy",
              body: "Since 1987, Maison has been at the forefront of luxury craftsmanship. Each piece tells a story of dedication, precision, and timeless beauty.",
              alignment: "center",
            },
          },
          makeFooter({ companyName: "Maison" }),
        ],
      },
    ],
  },

  // ── 5. Fresh & Playful ────────────────────────────────
  {
    id: "fresh-playful",
    name: "Fresh & Playful",
    description: "Bright colors and rounded shapes. Perfect for kids, pets, or fun brands.",
    category: "Kids & Pets",
    theme: {
      colors: {
        primary: "#7C3AED",
        secondary: "#6366F1",
        accent: "#F59E0B",
        background: "#FFFFFF",
        surface: "#F5F3FF",
        text: "#1E1B4B",
      },
      typography: {
        headingFont: "Inter",
        bodyFont: "Inter",
        headingSize: "large",
        bodySize: "default",
      },
      buttons: { style: "pill", shadow: true },
      cards: { radius: 20, shadow: true, border: false },
      animations: "scale",
    },
    pages: [
      {
        id: generateId("pg"),
        title: "Home",
        slug: "home",
        isVisible: true,
        sections: [
          makeHeader({ logoText: "Pawsome" }),
          {
            id: generateId("sec"),
            type: "hero",
            isVisible: true,
            config: {
              headline: "Happy Pets, Happy Life 🐾",
              subtitle: "Premium treats and toys your furry friends will love.",
              ctaText: "Shop Treats",
              ctaLink: "/products",
              backgroundImage: "",
              overlayOpacity: 0.1,
              alignment: "center",
              height: "large",
            },
          },
          {
            id: generateId("sec"),
            type: "featured-products",
            isVisible: true,
            config: {
              title: "Best Sellers",
              subtitle: "Loved by pets everywhere",
              productCount: 4,
              layout: "grid",
              columns: 4,
            },
          },
          {
            id: generateId("sec"),
            type: "faq",
            isVisible: true,
            config: {
              title: "Common Questions",
              items: [
                { question: "Are your products safe for all breeds?", answer: "Yes! All our products are vet-approved and tested for safety across all breeds and sizes." },
                { question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days. Express shipping is available at checkout." },
                { question: "Can I return an opened product?", answer: "We offer a 30-day satisfaction guarantee. If your pet doesn't love it, we'll refund you." },
              ],
            },
          },
          makeFooter({ companyName: "Pawsome" }),
        ],
      },
    ],
  },

  // ── 6. Professional SaaS ──────────────────────────────
  {
    id: "professional-saas",
    name: "Professional",
    description: "Clean, trustworthy design for B2B, SaaS, or professional services.",
    category: "Business & SaaS",
    theme: {
      colors: {
        primary: "#2563EB",
        secondary: "#64748B",
        accent: "#2563EB",
        background: "#FFFFFF",
        surface: "#F8FAFC",
        text: "#0F172A",
      },
      typography: {
        headingFont: "Inter",
        bodyFont: "Inter",
        headingSize: "default",
        bodySize: "default",
      },
      buttons: { style: "rounded", shadow: true },
      cards: { radius: 12, shadow: true, border: false },
      animations: "fade",
    },
    pages: [
      {
        id: generateId("pg"),
        title: "Home",
        slug: "home",
        isVisible: true,
        sections: [
          makeHeader({ logoText: "Acme Inc" }),
          {
            id: generateId("sec"),
            type: "hero",
            isVisible: true,
            config: {
              headline: "Everything you need to scale",
              subtitle: "The all-in-one platform trusted by 10,000+ businesses worldwide.",
              ctaText: "Get Started",
              ctaLink: "/products",
              backgroundImage: "",
              overlayOpacity: 0,
              alignment: "center",
              height: "medium",
            },
          },
          {
            id: generateId("sec"),
            type: "features",
            isVisible: true,
            config: {
              title: "Why Choose Us",
              items: [
                { icon: "Zap", title: "Lightning Fast", description: "Optimized performance that keeps your team productive." },
                { icon: "Lock", title: "Enterprise Security", description: "SOC 2 compliant with end-to-end encryption." },
                { icon: "BarChart3", title: "Analytics Built In", description: "Real-time insights to make better decisions." },
              ],
              columns: 3,
            },
          },
          {
            id: generateId("sec"),
            type: "featured-products",
            isVisible: true,
            config: {
              title: "Our Solutions",
              subtitle: "Plans for every stage of growth",
              productCount: 3,
              layout: "grid",
              columns: 3,
            },
          },
          makeFooter({ companyName: "Acme Inc" }),
        ],
      },
    ],
  },
  
  // ── 7. Classic Denim ──────────────────────────────────
  {
    id: "classic-denim",
    name: "Classic Denim",
    description: "Timeless indigo tones and structured layouts. Ideal for heritage clothing and denim brands.",
    category: "Fashion & Clothing",
    theme: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#475569",
        accent: "#2563EB",
        background: "#FCFDFE",
        surface: "#F1F5F9",
        text: "#0F172A",
      },
      typography: {
        headingFont: "Playfair Display",
        bodyFont: "Inter",
        headingSize: "default",
        bodySize: "default",
      },
      buttons: { style: "rounded", shadow: true },
      cards: { radius: 8, shadow: true, border: false },
      animations: "fade",
    },
    pages: [
      {
        id: generateId("pg"),
        title: "Home",
        slug: "home",
        isVisible: true,
        sections: [
          makeHeader({ logoText: "Denim Co." }),
          {
            id: generateId("sec"),
            type: "hero",
            isVisible: true,
            config: {
              headline: "Built to Wear. Made to Last.",
              subtitle: "Explore our collection of premium raw selvage denim, shirts, and heritage outerwear.",
              ctaText: "Shop Denim",
              ctaLink: "/products",
              backgroundImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1600",
              overlayOpacity: 0.4,
              alignment: "center",
              height: "large",
            },
          },
          {
            id: generateId("sec"),
            type: "featured-products",
            isVisible: true,
            config: {
              title: "The Denim Shop",
              subtitle: "Handcrafted selvage fits",
              productCount: 4,
              layout: "grid",
              columns: 4,
            },
          },
          {
            id: generateId("sec"),
            type: "image-banner",
            isVisible: true,
            config: {
              imageUrl: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1600",
              headline: "Heritage Craftsmanship",
              subtitle: "Woven on traditional shuttle looms and stitched by master craftsmen.",
              ctaText: "Learn Our Process",
              ctaLink: "/about",
              alignment: "right",
              height: "medium",
            },
          },
          {
            id: generateId("sec"),
            type: "features",
            isVisible: true,
            config: {
              title: "The Selvage Promise",
              items: [
                { icon: "Shield", title: "Lifetime Warranty", description: "Free repairs on all hardware and seams." },
                { icon: "Truck", title: "Free Global Shipping", description: "Delivered to your doorstep in 3-5 days." },
                { icon: "RotateCcw", title: "Fit Guarantee", description: "Exchange for any size or cut free of charge." },
              ],
              columns: 3,
            },
          },
          makeFooter({ companyName: "Denim Co." }),
        ],
      },
    ],
  },

  // ── 8. Streetwear Capsule ─────────────────────────────
  {
    id: "streetwear-capsule",
    name: "Streetwear Drop",
    description: "High contrast dark mode with neon accents and bold layouts. Tailored for capsule clothing drops.",
    category: "Streetwear & Fashion",
    theme: {
      colors: {
        primary: "#000000",
        secondary: "#71717A",
        accent: "#A3E635",
        background: "#09090B",
        surface: "#18181B",
        text: "#FAFAFA",
      },
      typography: {
        headingFont: "Inter",
        bodyFont: "Inter",
        headingSize: "large",
        bodySize: "default",
      },
      buttons: { style: "square", shadow: false },
      cards: { radius: 0, shadow: false, border: true },
      animations: "modern",
    },
    pages: [
      {
        id: generateId("pg"),
        title: "Home",
        slug: "home",
        isVisible: true,
        sections: [
          makeHeader({ logoText: "DROP.01", showAnnouncement: true, announcementText: "⚡ CAPSULE 01 DROPPING NOW. LIMITED QUANTITIES." }),
          {
            id: generateId("sec"),
            type: "hero",
            isVisible: true,
            config: {
              headline: "CAPSULE.01",
              subtitle: "Heavyweight cotton, oversized fits, custom hardware. Engineered for the street.",
              ctaText: "SHOP DROP",
              ctaLink: "/products",
              backgroundImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600",
              overlayOpacity: 0.55,
              alignment: "left",
              height: "full",
            },
          },
          {
            id: generateId("sec"),
            type: "featured-products",
            isVisible: true,
            config: {
              title: "CURRENT DROP",
              subtitle: "Capsule 01: Core basics",
              productCount: 4,
              layout: "grid",
              columns: 2,
            },
          },
          {
            id: generateId("sec"),
            type: "testimonials",
            isVisible: true,
            config: {
              title: "COMMUNITY FEEDBACK",
              items: [
                { quote: "Best heavyweight tee I've ever owned. The collar stays tight.", author: "Marcus T.", role: "Verified Buyer" },
                { quote: "Incredible fit and premium stitching. Fits oversized perfectly.", author: "Elena R.", role: "Collector" },
                { quote: "Fast shipping and high quality custom packaging.", author: "Jin W.", role: "Verified Buyer" },
              ],
            },
          },
          {
            id: generateId("sec"),
            type: "newsletter",
            isVisible: true,
            config: {
              title: "GET DROPS FIRST",
              subtitle: "Sign up to receive early access codes for future drops.",
              buttonText: "JOIN SYSTEM",
              placeholder: "system@email.com",
            },
          },
          makeFooter({ companyName: "DROP.01" }),
        ],
      },
    ],
  },
];

export function getTemplates() {
  return TEMPLATES;
}

export function getTemplateById(
  id: string
): (typeof TEMPLATES)[0] | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function templateToDesignState(
  template: (typeof TEMPLATES)[0]
): DesignState {
  return {
    templateId: template.id,
    theme: structuredClone(template.theme),
    pages: structuredClone(template.pages),
    version: 1,
    publishedAt: null,
  };
}
