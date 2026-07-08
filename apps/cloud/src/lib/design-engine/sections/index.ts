import type { SectionType, SectionDefinition, InspectorField } from "../types";

// ─── Section Registry ──────────────────────────────────────

// Maps section type → its metadata, default config, and inspector schema
const SECTION_REGISTRY: Record<SectionType, SectionDefinition> = {
  header: {
    type: "header",
    label: "Header",
    category: "navigation",
    icon: "PanelTop",
    description: "Site header with logo, navigation, and cart icon.",
    defaultConfig: {
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
    },
    inspectorFields: [
      { key: "logoText", label: "Logo Text", type: "text", tab: "content" },
      { key: "showCart", label: "Show Cart Icon", type: "toggle", tab: "content" },
      { key: "showAnnouncement", label: "Announcement Bar", type: "toggle", tab: "content" },
      { key: "announcementText", label: "Announcement Text", type: "text", tab: "content" },
    ],
  },

  hero: {
    type: "hero",
    label: "Hero Banner",
    category: "hero",
    icon: "Image",
    description: "Full-width hero with headline, subtitle, and call-to-action.",
    defaultConfig: {
      headline: "Welcome to Our Store",
      subtitle: "Discover products you'll love.",
      ctaText: "Shop Now",
      ctaLink: "/products",
      backgroundImage: "",
      overlayOpacity: 0.3,
      alignment: "center",
      height: "large",
    },
    inspectorFields: [
      { key: "headline", label: "Headline", type: "text", tab: "content" },
      { key: "subtitle", label: "Subtitle", type: "textarea", tab: "content" },
      { key: "ctaText", label: "Button Text", type: "text", tab: "content" },
      { key: "ctaLink", label: "Button Link", type: "text", tab: "content" },
      { key: "backgroundImage", label: "Background Image", type: "image", tab: "content" },
      { key: "overlayOpacity", label: "Overlay Darkness", type: "number", tab: "style" },
      { key: "alignment", label: "Text Alignment", type: "select", tab: "style", options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ]},
      { key: "height", label: "Section Height", type: "select", tab: "layout", options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
        { label: "Full Screen", value: "full" },
      ]},
    ],
  },

  "featured-products": {
    type: "featured-products",
    label: "Featured Products",
    category: "commerce",
    icon: "ShoppingBag",
    description: "Grid of featured products from your catalog.",
    defaultConfig: {
      title: "Featured Products",
      subtitle: "",
      productCount: 4,
      layout: "grid",
      columns: 4,
    },
    inspectorFields: [
      { key: "title", label: "Section Title", type: "text", tab: "content" },
      { key: "subtitle", label: "Subtitle", type: "text", tab: "content" },
      { key: "productCount", label: "Products to Show", type: "number", tab: "content" },
      { key: "columns", label: "Columns", type: "select", tab: "layout", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]},
    ],
  },

  "rich-text": {
    type: "rich-text",
    label: "Rich Text",
    category: "content",
    icon: "Type",
    description: "Heading and body text for storytelling or descriptions.",
    defaultConfig: {
      heading: "Our Story",
      body: "Share your brand story, mission, or any message with your visitors.",
      alignment: "center",
    },
    inspectorFields: [
      { key: "heading", label: "Heading", type: "text", tab: "content" },
      { key: "body", label: "Body Text", type: "textarea", tab: "content" },
      { key: "alignment", label: "Alignment", type: "select", tab: "style", options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ]},
    ],
  },

  "image-banner": {
    type: "image-banner",
    label: "Image Banner",
    category: "content",
    icon: "ImagePlus",
    description: "Full-width image with optional text overlay.",
    defaultConfig: {
      imageUrl: "",
      headline: "Banner Headline",
      subtitle: "Add a description for this banner section.",
      ctaText: "Learn More",
      ctaLink: "#",
      alignment: "center",
      height: "medium",
    },
    inspectorFields: [
      { key: "imageUrl", label: "Image URL", type: "image", tab: "content" },
      { key: "headline", label: "Headline", type: "text", tab: "content" },
      { key: "subtitle", label: "Subtitle", type: "textarea", tab: "content" },
      { key: "ctaText", label: "Button Text", type: "text", tab: "content" },
      { key: "ctaLink", label: "Button Link", type: "text", tab: "content" },
      { key: "alignment", label: "Alignment", type: "select", tab: "style", options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ]},
      { key: "height", label: "Height", type: "select", tab: "layout", options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ]},
    ],
  },

  gallery: {
    type: "gallery",
    label: "Image Gallery",
    category: "content",
    icon: "LayoutGrid",
    description: "Showcase multiple images in a grid layout.",
    defaultConfig: {
      title: "Gallery",
      images: [],
      columns: 3,
    },
    inspectorFields: [
      { key: "title", label: "Section Title", type: "text", tab: "content" },
      { key: "columns", label: "Columns", type: "select", tab: "layout", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]},
    ],
  },

  features: {
    type: "features",
    label: "Features",
    category: "content",
    icon: "Sparkles",
    description: "Icon + title + description blocks for key selling points.",
    defaultConfig: {
      title: "Why Choose Us",
      items: [
        { icon: "Truck", title: "Free Shipping", description: "On all orders over $50" },
        { icon: "RotateCcw", title: "Easy Returns", description: "30-day hassle-free returns" },
        { icon: "Shield", title: "Secure Checkout", description: "SSL encrypted payment" },
      ],
      columns: 3,
    },
    inspectorFields: [
      { key: "title", label: "Section Title", type: "text", tab: "content" },
      { key: "columns", label: "Columns", type: "select", tab: "layout", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]},
    ],
  },

  testimonials: {
    type: "testimonials",
    label: "Testimonials",
    category: "social",
    icon: "MessageSquareQuote",
    description: "Customer reviews and social proof.",
    defaultConfig: {
      title: "What Our Customers Say",
      items: [
        { quote: "Absolutely love the quality!", author: "Sarah M.", role: "Verified Buyer" },
        { quote: "Best purchase I've made this year.", author: "James L.", role: "Customer" },
        { quote: "Fast shipping and great packaging.", author: "Anna K.", role: "Repeat Buyer" },
      ],
      layout: "cards",
    },
    inspectorFields: [
      { key: "title", label: "Section Title", type: "text", tab: "content" },
      { key: "layout", label: "Layout", type: "select", tab: "layout", options: [
        { label: "Cards", value: "cards" },
        { label: "Carousel", value: "carousel" },
        { label: "Stacked", value: "stacked" },
      ]},
    ],
  },

  newsletter: {
    type: "newsletter",
    label: "Newsletter",
    category: "marketing",
    icon: "Mail",
    description: "Email signup form with heading and description.",
    defaultConfig: {
      title: "Stay in the Loop",
      subtitle: "Subscribe to get updates on new products and exclusive offers.",
      buttonText: "Subscribe",
      placeholder: "Enter your email",
    },
    inspectorFields: [
      { key: "title", label: "Title", type: "text", tab: "content" },
      { key: "subtitle", label: "Subtitle", type: "textarea", tab: "content" },
      { key: "buttonText", label: "Button Text", type: "text", tab: "content" },
      { key: "placeholder", label: "Placeholder", type: "text", tab: "content" },
    ],
  },

  faq: {
    type: "faq",
    label: "FAQ",
    category: "content",
    icon: "HelpCircle",
    description: "Frequently asked questions accordion.",
    defaultConfig: {
      title: "Frequently Asked Questions",
      items: [
        { question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days." },
        { question: "What is your return policy?", answer: "We offer a 30-day hassle-free return policy." },
        { question: "Do you offer gift wrapping?", answer: "Yes! Gift wrapping is available at checkout." },
      ],
    },
    inspectorFields: [
      { key: "title", label: "Section Title", type: "text", tab: "content" },
    ],
  },

  announcement: {
    type: "announcement",
    label: "Announcement Bar",
    category: "marketing",
    icon: "Megaphone",
    description: "Top banner for promotions and important notices.",
    defaultConfig: {
      text: "Free shipping on orders over $50!",
      link: "",
      dismissible: true,
    },
    inspectorFields: [
      { key: "text", label: "Announcement Text", type: "text", tab: "content" },
      { key: "link", label: "Link URL", type: "text", tab: "content" },
      { key: "dismissible", label: "Can Dismiss", type: "toggle", tab: "layout" },
    ],
  },

  footer: {
    type: "footer",
    label: "Footer",
    category: "navigation",
    icon: "PanelBottom",
    description: "Site footer with links, social icons, and copyright.",
    defaultConfig: {
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
    },
    inspectorFields: [
      { key: "companyName", label: "Company Name", type: "text", tab: "content" },
      { key: "description", label: "Description", type: "textarea", tab: "content" },
      { key: "showSocial", label: "Show Social Links", type: "toggle", tab: "content" },
    ],
  },
};

export function getSectionDefinition(type: SectionType): SectionDefinition {
  return SECTION_REGISTRY[type];
}

export function getAllSections(): SectionDefinition[] {
  return Object.values(SECTION_REGISTRY);
}

export function getSectionsByCategory(category: string): SectionDefinition[] {
  return Object.values(SECTION_REGISTRY).filter((s) => s.category === category);
}

export function getSectionCategories(): string[] {
  const cats = new Set(Object.values(SECTION_REGISTRY).map((s) => s.category));
  return Array.from(cats);
}

export { SECTION_REGISTRY };
