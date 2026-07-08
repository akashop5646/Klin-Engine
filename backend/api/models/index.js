import mongoose from "mongoose";

const Schema = mongoose.Schema;

// 1. User Schema
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  googleId: { type: String },
  activeWorkspaceId: { type: Schema.Types.ObjectId, ref: "Workspace" },
  onboardingCompleted: { type: Boolean, default: false },
  avatar: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationOtp: { type: String },
  verificationOtpExpires: { type: Date },
  resetPasswordOtp: { type: String },
  resetPasswordOtpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

// 2. Workspace Schema
const WorkspaceSchema = new Schema({
  name: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  members: [{
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    role: { type: String, enum: ["Owner", "Admin", "Developer", "Designer", "Editor", "Support", "Viewer"], default: "Viewer" }
  }],
  planId: { type: String, default: "free" }, // free, pro, enterprise
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now }
});

// 3. Website Schema
const WebsiteSchema = new Schema({
  _id: { type: String }, // support custom string slug IDs
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
  categoryId: { type: String },
  templateId: { type: String },
  activeDomain: { type: String },
  customDomains: [{ type: String }],
  status: { type: String, enum: ["Draft", "Published", "Archived"], default: "Draft" },
  createdAt: { type: Date, default: Date.now }
});

// 4. Page Schema
const PageSchema = new Schema({
  websiteId: { type: String, required: true },
  frontendId: { type: String }, // track frontend symbols pg_...
  title: { type: String, required: true },
  slug: { type: String, required: true },
  isHome: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// 5. Section Schema
const SectionSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, ref: "Page", required: true },
  frontendId: { type: String }, // track frontend symbols sec_...
  type: { type: String, required: true },
  isVisible: { type: Boolean, default: true },
  orderIndex: { type: Number, default: 0 },
  config: { type: Schema.Types.Mixed, default: {} }
});

// 6. Block Schema
const BlockSchema = new Schema({
  sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
  type: { type: String, required: true },
  orderIndex: { type: Number, default: 0 },
  props: { type: Schema.Types.Mixed, default: {} }
});

// 7. Template Schema
const TemplateSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  themePresetId: { type: String },
  pagesPresetJSON: { type: Schema.Types.Mixed },
  thumbnail: { type: String }
});

// 8. Theme Schema
const ThemeSchema = new Schema({
  websiteId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  colors: {
    primary: { type: String, default: "#18181B" },
    secondary: { type: String, default: "#71717A" },
    accent: { type: String, default: "#D97706" },
    background: { type: String, default: "#FFFFFF" },
    surface: { type: String, default: "#FAFAFA" },
    text: { type: String, default: "#18181B" }
  },
  typography: {
    headingFont: { type: String, default: "Inter" },
    bodyFont: { type: String, default: "Inter" },
    headingSize: { type: String, default: "default" },
    bodySize: { type: String, default: "default" }
  },
  buttons: {
    style: { type: String, default: "rounded" },
    shadow: { type: Boolean, default: false }
  },
  cards: {
    radius: { type: Number, default: 12 },
    shadow: { type: Boolean, default: true },
    border: { type: Boolean, default: false }
  },
  animations: { type: String, default: "fade" },
  darkThemeConfig: { type: Schema.Types.Mixed }
});

// 9. Asset Schema
const AssetSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  type: { type: String, enum: ["images", "videos", "fonts", "svg", "icons", "documents"], required: true },
  folder: { type: String, default: "/" },
  size: { type: Number },
  tags: [{ type: String }],
  altText: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  websiteId: { type: Schema.Types.ObjectId, ref: "Website" },
  createdAt: { type: Date, default: Date.now }
});

// 10. Collection Schema (CMS)
const CollectionSchema = new Schema({
  websiteId: { type: Schema.Types.ObjectId, ref: "Website", required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  icon: { type: String },
  fields: [{
    name: { type: String, required: true },
    type: { type: String, enum: ["text", "rich-text", "number", "image", "boolean", "relation"], required: true },
    required: { type: Boolean, default: false }
  }]
});

// 11. Entry Schema (CMS)
const EntrySchema = new Schema({
  collectionId: { type: Schema.Types.ObjectId, ref: "Collection", required: true },
  data: { type: Schema.Types.Mixed, default: {} },
  slug: { type: String, required: true },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  createdAt: { type: Date, default: Date.now }
});

// 12. Product Schema (Commerce)
const ProductSchema = new Schema({
  websiteId: { type: Schema.Types.ObjectId, ref: "Website", required: true },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["draft", "active", "archived"], default: "draft" },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

// 13. Variant Schema (Commerce)
const VariantSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  sku: { type: String },
  barcode: { type: String },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  options: { type: Schema.Types.Mixed, default: {} } // e.g. { size: "M", color: "Red" }
});

// 14. Inventory Schema (Commerce)
const InventorySchema = new Schema({
  variantId: { type: Schema.Types.ObjectId, ref: "Variant", required: true },
  warehouseLocation: { type: String },
  quantity: { type: Number, default: 0 },
  incomingQuantity: { type: Number, default: 0 }
});

// 15. Customer Schema (Commerce)
const CustomerSchema = new Schema({
  websiteId: { type: Schema.Types.ObjectId, ref: "Website", required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  totalSpent: { type: Number, default: 0 },
  ordersCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// 16. Order Schema (Commerce)
const OrderSchema = new Schema({
  websiteId: { type: Schema.Types.ObjectId, ref: "Website", required: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
  status: { type: String, enum: ["pending", "paid", "fulfilled"], default: "pending" },
  total: { type: Number, required: true },
  lineItems: [{
    variantId: { type: Schema.Types.ObjectId, ref: "Variant" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

// 17. Discount Schema (Commerce)
const DiscountSchema = new Schema({
  websiteId: { type: Schema.Types.ObjectId, ref: "Website", required: true },
  code: { type: String, required: true },
  type: { type: String, enum: ["percentage", "fixed"], required: true },
  value: { type: Number, required: true },
  status: { type: String, enum: ["active", "expired", "disabled"], default: "active" },
  usageLimit: { type: Number },
  usageCount: { type: Number, default: 0 }
});

// 18. Domain Schema (Infrastructure)
const DomainSchema = new Schema({
  websiteId: { type: Schema.Types.ObjectId, ref: "Website", required: true },
  domain: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
  sslStatus: { type: String, enum: ["none", "pending", "active"], default: "none" },
  dnsRecords: [{
    type: { type: String, default: "CNAME" },
    host: { type: String },
    value: { type: String }
  }]
});

// 19. Deployment Schema (Infrastructure)
const DeploymentSchema = new Schema({
  websiteId: { type: Schema.Types.ObjectId, ref: "Website", required: true },
  snapshotId: { type: Schema.Types.ObjectId, ref: "Snapshot", required: true },
  environment: { type: String, enum: ["development", "preview", "production"], default: "development" },
  status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
  version: { type: Number, default: 1 },
  url: { type: String },
  duration: { type: Number }, // in milliseconds
  createdAt: { type: Date, default: Date.now }
});

// 20. Snapshot Schema (Recovery)
const SnapshotSchema = new Schema({
  websiteId: { type: Schema.Types.ObjectId, ref: "Website", required: true },
  version: { type: Number, required: true },
  message: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  thumbnail: { type: String },
  builderJSON: { type: Schema.Types.Mixed }, // Split Pages/Sections/Blocks values
  themeJSON: { type: Schema.Types.Mixed },
  assetsVersion: { type: String },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// 21. Activity Schema (Logging)
const ActivitySchema = new Schema({
  workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
  websiteId: { type: Schema.Types.ObjectId, ref: "Website" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: {
    type: { type: String, required: true }, // e.g. "website.created", "product.created"
    desc: { type: String }
  },
  timestamp: { type: Date, default: Date.now }
});

// 22. Plugin Schema (Extensions)
const PluginSchema = new Schema({
  name: { type: String, required: true },
  identifier: { type: String, required: true, unique: true },
  version: { type: String, required: true },
  permissions: [{ type: String }],
  status: { type: String, enum: ["enabled", "disabled"], default: "enabled" },
  config: { type: Schema.Types.Mixed, default: {} }
});

// Exporting Models
export const User = mongoose.model("User", UserSchema);
export const Workspace = mongoose.model("Workspace", WorkspaceSchema);
export const Website = mongoose.model("Website", WebsiteSchema);
export const Page = mongoose.model("Page", PageSchema);
export const Section = mongoose.model("Section", SectionSchema);
export const Block = mongoose.model("Block", BlockSchema);
export const Template = mongoose.model("Template", TemplateSchema);
export const Theme = mongoose.model("Theme", ThemeSchema);
export const Asset = mongoose.model("Asset", AssetSchema);
export const Collection = mongoose.model("Collection", CollectionSchema);
export const Entry = mongoose.model("Entry", EntrySchema);
export const Product = mongoose.model("Product", ProductSchema);
export const Variant = mongoose.model("Variant", VariantSchema);
export const Inventory = mongoose.model("Inventory", InventorySchema);
export const Customer = mongoose.model("Customer", CustomerSchema);
export const Order = mongoose.model("Order", OrderSchema);
export const Discount = mongoose.model("Discount", DiscountSchema);
export const Domain = mongoose.model("Domain", DomainSchema);
export const Deployment = mongoose.model("Deployment", DeploymentSchema);
export const Snapshot = mongoose.model("Snapshot", SnapshotSchema);
export const Activity = mongoose.model("Activity", ActivitySchema);
export const Plugin = mongoose.model("Plugin", PluginSchema);
