import { ContentType } from "./ContentType";

export class ContentTypeRegistry {
  private static _instance: ContentTypeRegistry;
  private _types: Map<string, ContentType> = new Map();

  private constructor() {
    this.registerDefaults();
  }

  public static getInstance(): ContentTypeRegistry {
    if (!ContentTypeRegistry._instance) {
      ContentTypeRegistry._instance = new ContentTypeRegistry();
    }
    return ContentTypeRegistry._instance;
  }

  public register(contentType: ContentType): void {
    this._types.set(contentType.slug, contentType);
  }

  public get(slug: string): ContentType | undefined {
    return this._types.get(slug);
  }

  public getAll(): ContentType[] {
    return Array.from(this._types.values());
  }

  private registerDefaults(): void {
    // 1. Product Type
    this.register(
      new ContentType({
        slug: "product",
        name: "Product",
        fields: [
          { name: "title", type: "Text", required: true },
          { name: "price", type: "Money", required: true },
          { name: "image", type: "Image", required: false },
          { name: "description", type: "RichText", required: false },
          { name: "stock", type: "Number", defaultValue: 0 },
        ],
      })
    );

    // 2. Blog Type
    this.register(
      new ContentType({
        slug: "blog",
        name: "Blog Post",
        fields: [
          { name: "title", type: "Text", required: true },
          { name: "author", type: "Text", required: true },
          { name: "content", type: "RichText", required: true },
          { name: "featuredImage", type: "Image", required: false },
          { name: "slug", type: "Slug", required: true },
        ],
      })
    );

    // 3. FAQ Type
    this.register(
      new ContentType({
        slug: "faq",
        name: "FAQ Item",
        fields: [
          { name: "question", type: "Text", required: true },
          { name: "answer", type: "RichText", required: true },
        ],
      })
    );

    // 4. Team Member Type
    this.register(
      new ContentType({
        slug: "team",
        name: "Team Member",
        fields: [
          { name: "name", type: "Text", required: true },
          { name: "role", type: "Text", required: true },
          { name: "bio", type: "Textarea", required: false },
          { name: "photo", type: "Image", required: false },
        ],
      })
    );

    // 5. Customer Review / Testimonial Type
    this.register(
      new ContentType({
        slug: "review",
        name: "Customer Review",
        fields: [
          { name: "customerName", type: "Text", required: true },
          { name: "rating", type: "Rating", required: true },
          { name: "feedback", type: "Textarea", required: true },
        ],
      })
    );

    // 6. Discount Coupon Type
    this.register(
      new ContentType({
        slug: "coupon",
        name: "Coupon",
        fields: [
          { name: "code", type: "Text", required: true },
          { name: "discountValue", type: "Number", required: true },
          { name: "expiryDate", type: "Date", required: false },
        ],
      })
    );
  }
}
